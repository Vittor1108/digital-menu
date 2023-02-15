import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IReq } from 'src/@types/req';
import { PaginationCategroyDto } from '../category/dto/pagination-category';
import { CreateEmployeeDto } from './dto/create-employee.dto';
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

  @Patch(':id')
  deactivate(@Param('id') id: number): Promise<boolean> {
    return this.employeesService.deactivate(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Employee> {
    return this.employeesService.findOne(id);
  }

  @Get('/take=:take?/skip=:skip?/text=:text?')
  findAll(
    @Param() pagination: PaginationCategroyDto,
    @Request() req: IReq,
  ): Promise<Employee[]> {
    return this.employeesService.findAll(req, pagination);
  }
}
