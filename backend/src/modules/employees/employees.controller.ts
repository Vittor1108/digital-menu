import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PaginationEmployee } from './dto/pagination-employee.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

@Controller('employees')
@UseGuards(AuthGuard('jwt'))
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Request() req: IReq,
  ): Promise<Employee> {
    return this.employeesService.create(createEmployeeDto, req);
  }

  @Get('/take=:take?/skip=:skip?/text=:text?')
  findAll(@Param() params: PaginationEmployee, @Request() req: IReq) {
    return this.employeesService.findAll(params, req);
  }
}
