import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { ForgotPasswrodDto } from './dto/forgot-password.dto';
import { ResetPassworDto } from './dto/reset-password.dto';
import * as crypto from 'crypto';
import { transport } from 'src/utils/mailer';
import bcrypt from 'src/utils/bcrypt';

@Injectable()
export class ResetPasswordService {
  constructor(private readonly prismaService: PrismaService) {}

  public fogortPassword = async (data: ForgotPasswrodDto): Promise<boolean> => {
    const user = await this.prismaService.establishment.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new HttpException(
        HelpMessager.userNotFound,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = crypto.randomBytes(20).toString('hex');
    const mailOptions = {
      from: 'vittordaniel1108@gmail.com',
      to: data.email,
      subject: 'Sending email',
      template: 'auth/forgotPassword',
      context: {
        token,
      },
    };

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        throw new HttpException(
          HelpMessager.errorResetPasswrod,
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    await this.prismaService.establishment.update({
      where: {
        email: data.email,
      },
      data: {
        tokenForgotPassword: token,
      },
    });

    return true;
  };

  public resetPassword = async (
    token: string,
    data: ResetPassworDto,
  ): Promise<boolean> => {
    const user = await this.prismaService.establishment.findUnique({
      where: {
        tokenForgotPassword: token,
      },
    });

    if (!user) {
      throw new HttpException(
        HelpMessager.userNotFoundToken,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const newPassword = await bcrypt.hashPassword(data.password);

    await this.prismaService.establishment.update({
      where: {
        tokenForgotPassword: token,
      },
      data: {
        password: newPassword,
      },
    });

    return true;
  };

  public verifyToken = async (token: string) => {
    const tokenExists = await this.prismaService.establishment.findUnique({
      where: {
        tokenForgotPassword: token,
      },
    });

    if (!tokenExists) {
      throw new HttpException(
        HelpMessager.userNotFoundToken,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  };
}
