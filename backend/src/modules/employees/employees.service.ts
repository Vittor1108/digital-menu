import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import bcrypt from 'src/utils/bcrypt';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PaginationEmployee } from './dto/pagination-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
@Injectable()
export class EmployeesService {
  constructor(private readonly prismaService: PrismaService) {}

  public create = async (
    data: CreateEmployeeDto,
    req: IReq,
  ): Promise<Employee> => {
    const employeExists = await this.prismaService.employee.findFirst({
      where: {
        user_id: req.user.id,
        email: data.email,
      },
    });

    if (employeExists) {
      throw new HttpException(
        HelpMessager.employees_exists,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hashPassword(data.password);
    const screeens = data.screens.map((id) => {
      return {
        id: id,
      };
    });

    const employee = await this.prismaService.employee.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPassword,
        user_id: req.user.id,
        screeens: {
          connect: screeens,
        },
      },

      include: {
        screeens: true,
        EmployeePhoto: true,
      },
    });

    return employee;
  };

  public updated = async (id: number, data: UpdateEmployeeDto) => {
    const employee = await this.prismaService.employee.findUnique({
      where: {
        id,
      },

      include: {
        screeens: true,
      },
    });

    if (!employee) {
      throw new HttpException(
        HelpMessager.employees_not_exists,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newScreeens = data.screens.map((e) => {
      return {
        id: e,
      };
    });
    const oldScreeens = employee.screeens.map((e) => e.id);

    const hashPassword = await bcrypt.hashPassword(data.password);

    await this.prismaService.employee.update({
      where: {
        id,
      },

      data: {
        screeens: {
          deleteMany: oldScreeens.map((id) => {
            return {
              id,
            };
          }),
        },
      },
    });

    const newEmployee = await this.prismaService.employee.update({
      where: {
        id,
      },

      data: {
        name: data.name,
        password: hashPassword,
        screeens: {
          connect: newScreeens,
        },
      },

      include: {
        screeens: true,
        EmployeePhoto: true,
      },
    });

    return newEmployee;
  };

  public findAll = async (
    params: PaginationEmployee,
    req: IReq,
  ): Promise<Employee[]> => {
    let employees: Employee[];
    if (params.text) {
      employees = await this.prismaService.employee.findMany({
        where: {
          user_id: req.user.id,
          AND: {
            name: {
              contains: params.text,
            },
          },
        },

        include: {
          screeens: true,
          EmployeePhoto: true,
        },
      });
    }

    if (params.skip && params.take) {
      employees = await this.prismaService.employee.findMany({
        where: {
          user_id: req.user.id,
        },

        take: Number(params.take),
        skip: Number(params.skip),

        include: {
          screeens: true,
          EmployeePhoto: true,
        },
      });
    }

    if (!params.skip && !params.take && !params.text) {
      employees = await this.prismaService.employee.findMany({
        where: {
          user_id: req.user.id,
        },

        include: {
          screeens: true,
          EmployeePhoto: true,
        },
      });
    }

    return employees;
  };

  public findOne = async (id: number): Promise<Employee> => {
    const employee = await this.prismaService.employee.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        screeens: true,
        EmployeePhoto: true,
      },
    });

    if (!employee) {
      throw new HttpException(
        HelpMessager.employees_not_exists,
        HttpStatus.BAD_REQUEST,
      );
    }

    return employee;
  };

  public delete = async (id: number): Promise<boolean> => {
    const employee = await this.prismaService.employee.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!employee) {
      throw new HttpException(
        HelpMessager.employees_not_exists,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prismaService.employee.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  };
}
