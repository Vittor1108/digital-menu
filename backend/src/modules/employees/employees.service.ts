import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import bcrypt from 'src/utils/bcrypt';
import { PaginationCategroyDto } from '../category/dto/pagination-category';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(private readonly prismaService: PrismaService) {}

  public create = async (
    data: CreateEmployeeDto,
    req: IReq,
  ): Promise<Employee> => {
    const establishment = await this.prismaService.establishment.findUnique({
      where: {
        id: Number(req.user.establishmentId),
      },
    });

    const employeeExists = await this.prismaService.employee.findFirst({
      where: {
        login: data.login,
      },
    });

    const acessScreens = await this.prismaService.screens.findMany({
      where: {
        id: {
          in: data.acessScreens,
        },
      },
    });

    if (acessScreens.length !== data.acessScreens.length) {
      throw new HttpException(
        'Tela(s) de acesso inválida(s)',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!establishment) {
      throw new HttpException(
        HelpMessager.establishmentNotExists,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (employeeExists) {
      throw new HttpException(
        HelpMessager.employees_exists,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hashPassword(data.password);

    const employee = await this.prismaService.employee.create({
      data: {
        name: data.name,
        login: data.login,
        password: hashPassword,
        establishmentId: req.user.establishmentId,
        screeens: {
          connect: data.acessScreens.map((e) => {
            return {
              id: e,
            };
          }),
        },
      },

      include: {
        screeens: true,
      },
    });

    return employee;
  };

  public deactivate = async (id: number): Promise<boolean> => {
    await this.findOne(id);

    await this.prismaService.employee.update({
      data: {
        activeAccount: false,
      },

      where: {
        id,
      },
    });

    return true;
  };

  public findOne = async (id: number): Promise<Employee> => {
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

    return employee;
  };

  public update = async (
    id: number,
    updateDto: UpdateEmployeeDto,
  ): Promise<Employee> => {
    await this.findOne(id);

    const employee = await this.findOne(id);

    const loginExists = await this.prismaService.employee.findUnique({
      where: {
        login: updateDto.login,
      },
    });

    if (employee.login !== updateDto.login && loginExists) {
      throw new HttpException(
        `Funcionário com o login ${loginExists.login} já existe.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword =
      updateDto.password === employee.password
        ? updateDto.password
        : await bcrypt.hashPassword(updateDto.password);

    await this.prismaService.employee.update({
      where: {
        id,
      },

      data: {
        screeens: {
          set: [],
        },
      },
    });

    const newEmployee = await this.prismaService.employee.update({
      where: {
        id,
      },

      data: {
        login: updateDto.login,
        password: hashPassword,
        name: updateDto.name,
        screeens: {
          connect: updateDto.acessScreens.map((e) => {
            return {
              id: e,
            };
          }),
        },
      },

      include: {
        screeens: true,
      },
    });

    return newEmployee;
  };

  public findAll = async (
    req: IReq,
    pagination: PaginationCategroyDto,
  ): Promise<Employee[]> => {
    //Filtrar por nome ou login
    if (pagination.text) {
      return await this.prismaService.employee.findMany({
        where: {
          OR: [
            {
              name: {
                contains: pagination.text,
              },
            },
            {
              login: {
                contains: pagination.text,
              },
            },
          ],

          AND: {
            establishmentId: req.user.establishmentId,
          },
        },
      });
    }
    //Paginação
    if (pagination.skip && pagination.take) {
      return await this.prismaService.employee.findMany({
        where: {
          establishmentId: req.user.establishmentId,
        },

        skip: Number(pagination.skip),
        take: Number(pagination.take),
      });
    }
    //Todos
    return await this.prismaService.employee.findMany({
      where: {
        establishmentId: req.user.establishmentId,
      },
    });
  };
}
