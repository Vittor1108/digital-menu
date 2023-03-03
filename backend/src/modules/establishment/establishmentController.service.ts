//PROJECT IMPORTS
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import * as crypto from 'crypto';
//DTO
import { EstablishmentDto } from './dto/create-establishment.dto';
//ENTITY
import { User } from './entities/user.entity';
//MY IMPORTS
import { HelpMessager } from 'src/helper/messageHelper';
import Bcrypt from 'src/utils/bcrypt';
import { transport } from '../../utils/mailer';
//OUT LIBS
import * as cpf_cnpj from 'cpf_cnpj';

@Injectable()
export class EstablishmentControllerService {
  constructor(private readonly prismaService: PrismaService) {}
  public create = async (data: EstablishmentDto): Promise<User> => {
    const { password, cpfCnpj } = data;

    const userEmailExists = await this.prismaService.establishment.findUnique({
      where: {
        email: data.email,
      },
    });

    const userCpfOrCnpjExists =
      await this.prismaService.establishment.findUnique({
        where: {
          cpfCnpj: cpfCnpj,
        },
      });

    if (userEmailExists) {
      throw new HttpException(HelpMessager.email_exits, HttpStatus.BAD_REQUEST);
    }

    if (userCpfOrCnpjExists) {
      throw new HttpException(
        HelpMessager.CpfOrCnpjExitis,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.validateCpfOrCnpj(cpfCnpj)) {
      throw new HttpException(
        HelpMessager.invalidCpfOrCnpj,
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = crypto.randomBytes(20).toString('hex');
    const hashPassword = await Bcrypt.hashPassword(password);

    const mailOptions = {
      from: 'vittordaniel1108@gmail.com',
      to: data.email,
      subject: 'Sending email',
      template: 'auth/activeAccount',
      context: {
        token,
      },
    };
    transport.sendMail(mailOptions, (err) => {
      if (err) {
        throw new HttpException(
          'Erro ao enviar o email',
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    const user = await this.prismaService.establishment.create({
      data: {
        email: data.email,
        cpfCnpj: data.cpfCnpj.replace(/\D/gim, ''),
        password: hashPassword,
        tokenActiveAccount: token,
        name: data.name,
      },
    });
    return user;
  };

  private validateCpfOrCnpj = (cpfOrCnpj: string): boolean => {
    if (cpfOrCnpj.length === 11) {
      //CPF
      const cpfFormat = cpf_cnpj.CPF.format(cpfOrCnpj);
      return cpf_cnpj.CPF.isValid(cpfFormat);
    } else {
      //CNPJ
      const cnpjFormat = cpf_cnpj.CNPJ.format(cpfOrCnpj);
      return cpf_cnpj.CNPJ.isValid(cnpjFormat);
    }
  };
}
