//PROJECT IMPORTS
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import * as crypto from 'crypto';
//DTO
import { CreateUserDto } from './dto/create-user.dto';
//ENTITY
import { User } from './entities/user.entity';
//MY IMPORTS
import { HelpMessager } from 'src/helper/messageHelper';
import Bcrypt from 'src/utils/bcrypt';
//OUT LIBS
import * as cpf_cnpj from 'cpf_cnpj';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  public create = async (data: CreateUserDto): Promise<User> => {
    const { password, cpf_cnpj } = data;

    if (password.length < 6) {
      throw new HttpException(
        HelpMessager.weakPassword,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.validateCpfOrCnpj(cpf_cnpj)) {
      throw new HttpException(
        HelpMessager.invalidCpfOrCnpj,
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = crypto.randomBytes(20).toString('hex');
    const hashPassword = await Bcrypt.hashPassword(password);
    console.log(hashPassword);
    const user = await this.prismaService.user.create({
      data: {
        email: data.email,
        cpf_cnpj: data.cpf_cnpj,
        password: hashPassword,
        tokenActiveAccount: token,
      },
    });
    return user;
  };

  private validateCpfOrCnpj = (cpfOrCnpj: string): boolean => {
    if (cpfOrCnpj.length === 14 || cpfOrCnpj.length === 11) {
      //CPF
      const cpfFormat = cpf_cnpj.CPF.format(cpfOrCnpj);
      return cpf_cnpj.CPF.isValid(cpfFormat);
    } else {
      const cnpjFormat = cpf_cnpj.CNPJ.format(cpfOrCnpj);
      return cpf_cnpj.CNPJ.isValid(cnpjFormat);
    }
  };
}
