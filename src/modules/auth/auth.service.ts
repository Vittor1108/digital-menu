//Libs
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
//DTO
import { ForgotPassword } from './dto/forgotPassword.dto';
import { ResetPassword } from './dto/resetPassword.dto';

//My imports
import { transport } from '../../utils/mailer';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  public confirmAccount = async (token: string): Promise<string> => {
    const user = this.prisma.user.findUnique({
      where: {
        tokenActiveAccount: token,
      },
    });

    if (!user) {
      throw new HttpException(
        'Token active account invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.user.update({
      where: {
        tokenActiveAccount: token,
      },
      data: {
        activeAccount: true,
      },
    });

    return 'Conta ativada';
  };

  public forgotPassword = async (data: ForgotPassword): Promise<string> => {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new HttpException(
        `email ${data.email} is not registered`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = crypto.randomBytes(20).toString('hex');

    const mailOptions = {
      from: 'vittordaniel1108@gmail.com',
      to: data.email,
      template: 'auth/forgotPassword',
      context: {
        token,
      },
    };

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        throw new HttpException('', HttpStatus.BAD_REQUEST);
      }
    });

    await this.prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        tokenForgotPassword: token,
      },
    });

    return 'Email de recuperação enviado';
  };

  public resetPassword = async (
    data: ResetPassword,
    token: string,
  ): Promise<any> => {
    const user = await this.prisma.user.findUnique({
      where: {
        tokenForgotPassword: token,
      },
    });

    if (!user) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }

    if (data.password.length < 7) {
      throw new HttpException(
        'User password needs at least 7 characters',
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = await this.hashPassword(data.password);

    await this.prisma.user.update({
      where: {
        tokenForgotPassword: token,
      },
      data: {
        password,
      },
    });
    return 'Senha resetada com sucesso';
  };

  private hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  };
}
