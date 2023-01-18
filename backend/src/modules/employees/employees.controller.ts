import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

@Controller('employees')
@UseGuards(AuthGuard('jwt'))
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Request() req: any,
  ): Promise<Employee> {
    return this.employeesService.create(createEmployeeDto, req);
  }
}
