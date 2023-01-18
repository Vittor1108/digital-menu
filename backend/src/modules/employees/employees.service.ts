import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import bcrypt from 'src/utils/bcrypt';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
@Injectable()
export class EmployeesService {
  constructor(private readonly prismaService: PrismaService) {}

  create = async (data: CreateEmployeeDto, req: any): Promise<Employee> => {
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

    const employee = await this.prismaService.employee.create({
      data: {
        name: data.email,
        email: data.email,
        password: hashPassword,
        user_id: req.user.id,
      },
    });

    return employee;
  };
}
