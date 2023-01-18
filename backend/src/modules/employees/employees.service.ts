import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import bcrypt from 'src/utils/bcrypt';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PaginationEmployee } from './dto/pagination-employee.dto';
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
        name: data.email,
        email: data.email,
        password: hashPassword,
        user_id: req.user.id,
        screeens: {
          connect: screeens,
        },
      },

      include: {
        screeens: true,
      },
    });

    return employee;
  };

  public findAll = async (params: PaginationEmployee, req: IReq) => {
    let employees: Employee[];
    if (params.text) {
      employees = await this.prismaService.employee.findMany({
        where: {
          user_id: req.user.id,
        },
      });
    }

    return employees;
  };
}
