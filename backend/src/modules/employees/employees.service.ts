import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly prismaService: PrismaService) {}

  create = async (data: CreateEmployeeDto, req: any) => {
    const employee = await this.prismaService.employee.findUnique({
      where: {
        email: data.email,
      },
    });

    if (employee) {
      throw new HttpException(
        HelpMessager.CpfOrCnpjExitis,
        HttpStatus.BAD_REQUEST,
      );
    }
  };
}
