import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import bcrypt from 'src/utils/bcrypt';
import { PaginationCategroyDto } from '../category/dto/pagination-category';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { IGetAllEmployees } from './interfaces';

@Injectable()
export class EmployeesService {
  constructor(private readonly prismaService: PrismaService) {}

  public create = async (
    { acessScreens, cpf, name, password }: CreateEmployeeDto,
    req: IReq,
  ) => {
    const employeeLogin = await this.findByLogin(cpf, req);

    if (employeeLogin) {
      throw new HttpException('CPF já cadastrado', HttpStatus.BAD_REQUEST);
    }

    const screensById = await this.prismaService.screens.findMany({
      where: {
        id: {
          in: acessScreens.map((e) => e),
        },
      },
    });

    if (
      screensById.length < acessScreens.length ||
      screensById.length > acessScreens.length
    ) {
      throw new HttpException(
        'Tela (s) com o id inválido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hashPassword(password);

    return await this.prismaService.employee.create({
      data: {
        establishmentId: req.user.id,
        login: cpf,
        name,
        password: hashPassword,
        screeens: {
          connect: acessScreens.map((e) => {
            return {
              id: e,
            };
          }),
        },
      },
    });
  };

  public update = async (
    id: number,
    { acessScreens, name, password }: UpdateEmployeeDto,
  ): Promise<Employee> => {
    const employee = await this.findOne(id);

    const screensById = await this.prismaService.screens.findMany({
      where: {
        id: {
          in: acessScreens.map((e) => e),
        },
      },
    });

    const allScreens = await this.prismaService.screens.findMany();

    if (
      screensById.length < acessScreens.length ||
      screensById.length > acessScreens.length
    ) {
      throw new HttpException(
        'Tela (s) com o id inválido.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hashPassword(password);

    return await this.prismaService.employee.update({
      where: {
        id: Number(id),
      },

      data: {
        name,
        password: hashPassword,
        screeens: {
          disconnect: allScreens.map((e) => {
            return {
              id: e.id,
            };
          }),
          connect: screensById.map((e) => {
            return {
              id: e.id,
            };
          }),
        },
      },

      include: {
        screeens: true,
      },
    });
  };

  public findOne = async (id: number): Promise<Employee> => {
    const employee = await this.prismaService.employee.findUnique({
      where: {
        id: Number(id),
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

    return employee;
  };

  public findByLogin = async (login: string, req: IReq): Promise<Employee> => {
    const employee = await this.prismaService.employee.findFirst({
      where: {
        login,
        AND: {
          establishmentId: req.user.id,
        },
      },
    });

    return employee;
  };

  public findAll = async (
    req: IReq,
    pagination: { take: number; skip: number; text: string },
  ): Promise<{ quantity: number; employees: Employee[] }> => {
    const paramsQuery: IGetAllEmployees = {
      where: {
        establishmentId: req.user.establishmentId,
      },
    };

    if (pagination.skip && pagination.take) {
      delete paramsQuery.where.name;
      paramsQuery.skip = Number(pagination.skip);
      paramsQuery.take = Number(pagination.take);
    }

    if (pagination.text) {
      delete paramsQuery.skip;
      delete paramsQuery.take;
      paramsQuery.where.name.contains = pagination.text;
    }

    const quantity = await this.prismaService.employee.count({
      where: {
        establishmentId: req.user.establishmentId,
      },
    });

    const employees = await this.prismaService.employee.findMany(paramsQuery);

    return {
      employees,
      quantity,
    };
  };

  public deactivate = async (id: number): Promise<boolean> => {
    await this.findOne(id);

    await this.prismaService.employee.update({
      where: {
        id: Number(id),
      },

      data: {
        activeAccount: false,
        resignationDate: new Date(),
      },
    });

    return true;
  };

  public delete = async (id: number): Promise<boolean> => {
    await this.findOne(id);

    await this.prismaService.employee.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  };
}
