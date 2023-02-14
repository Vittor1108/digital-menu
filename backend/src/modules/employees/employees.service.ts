import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  public create = (data: CreateEmployeeDto) => {
    console.log('OK');
  };
}
