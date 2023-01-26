import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PaginationEmployee } from './dto/pagination-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
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
  findAll(
    @Param() params: PaginationEmployee,
    @Request() req: IReq,
  ): Promise<{ employees: Employee[]; count: number }> {
    return this.employeesService.findAll(params, req);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Employee> {
    return this.employeesService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<boolean> {
    return this.employeesService.delete(id);
  }

  @Put(':id')
  updated(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.updated(id, updateEmployeeDto);
  }
}
