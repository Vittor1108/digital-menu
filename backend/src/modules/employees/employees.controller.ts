import {
  Body,
  Controller,
  Delete,
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
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

@Controller('employees')
@UseGuards(AuthGuard('jwt'))
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto, @Request() req: IReq) {
    return this.employeesService.create(createEmployeeDto, req);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Employee> {
    return this.employeesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeesService.update(id, updateDto);
  }

  @Get()
  findAll(@Request() req: IReq): Promise<Employee[]> {
    return this.employeesService.findAll(req);
  }

  @Patch(':id')
  deactivate(@Param('id') id: number): Promise<boolean> {
    return this.employeesService.deactivate(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<boolean> {
    return this.employeesService.delete(id);
  }
}
