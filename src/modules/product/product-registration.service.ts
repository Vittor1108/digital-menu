import { Injectable } from '@nestjs/common';
import { CreateProductRegistrationDto } from './dto/create-product-registration.dto';
import { UpdateProductRegistrationDto } from './dto/update-product-registration.dto';

@Injectable()
export class ProductRegistrationService {
  create(createProductRegistrationDto: CreateProductRegistrationDto) {
    return 'This action adds a new productRegistration';
  }

  findAll() {
    return `This action returns all productRegistration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productRegistration`;
  }

  update(id: number, updateProductRegistrationDto: UpdateProductRegistrationDto) {
    return `This action updates a #${id} productRegistration`;
  }

  remove(id: number) {
    return `This action removes a #${id} productRegistration`;
  }
}
