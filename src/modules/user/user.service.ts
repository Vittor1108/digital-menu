import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import * as cpf_cnpj from 'cpf_cnpj';
import { transport } from '../../utils/mailer';
import * as crtypto from 'crypto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public create = async (data: UserDto): Promise<UserDto> => {
    const cnpjOrCpfExists = await this.prisma.user.findUnique({
      where: {
        cpf_cnpj: data.cpf_cnpj,
      },
    });

    if (!this.validateCpfOrCnpj(data.cpf_cnpj)) {
      throw new HttpException('CPF or CNPJ is invalid', HttpStatus.BAD_REQUEST);
    }

    if (cnpjOrCpfExists) {
      throw new HttpException(
        'User with this CNPJ or CPF already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const emailExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailExists) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (data.password.length < 6) {
      throw new HttpException(
        'User password needs at least 7 characters',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = crtypto.randomBytes(20).toString('hex');
    const mailOptions = {
      from: 'vittordaniel1108@gmail.com',
      to: data.email,
      template: 'auth/activeAccount',
      context: {
        token,
      },
    };

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        throw new HttpException('', HttpStatus.BAD_REQUEST);
      }
    });

    const password = await this.hashPassword(data.password);
    const newUser = this.prisma.user.create({
      data: {
        email: data.email,
        cpf_cnpj: this.formatCpfOrCnpj(data.cpf_cnpj),
        password,
        tokenActiveAccount: token,
      },
    });
    return newUser;
  };

  private hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  };

  private validateCpfOrCnpj = (cpfOrCnpj: string): boolean => {
    if (cpfOrCnpj.length === 14 || cpfOrCnpj.length === 11) {
      cpf_cnpj.CPF.format(cpfOrCnpj);
      return cpf_cnpj.CPF.isValid(cpfOrCnpj);
    } else {
      cpf_cnpj.CNPJ.format(cpfOrCnpj);
      return cpf_cnpj.CNPJ.isValid(cpfOrCnpj);
    }
  };

  private formatCpfOrCnpj = (cpfOrCnpj: string): string => {
    if (cpfOrCnpj.length === 14 || cpfOrCnpj.length === 11) {
      return cpf_cnpj.CPF.strip(cpfOrCnpj);
    } else {
      return cpf_cnpj.CNPJ.strip(cpfOrCnpj);
    }
  };
}
