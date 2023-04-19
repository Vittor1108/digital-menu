import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import bcrypt from 'src/utils/bcrypt';
import { User } from '../reset-password/entity/user.entity';
import { Employee, Screens } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public validateUser = async (
    login: string,
    password: string,
  ): Promise<User | Employee> => {
    const user = await this.prismaService.establishment.findUnique({
      where: {
        email: login,
      },
    });

    const employee = await this.prismaService.employee.findFirst({
      where: {
        login,
      },
    });

    if (!user && !employee) {
      return null;
    }

    if (user && !(await bcrypt.comparePassword(password, user.password))) {
      return null;
    }

    return user ? user : employee;
  };

  public login = async (req: IReq) => {
    const payload = {
      sub: req.user.id,
      identify: req.user.email ? req.user.email : req.user.login,
      establishmentId: req.user.establishmentId
        ? req.user.establishmentId
        : req.user.id,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  };

  public indetifyUser = async (req: IReq): Promise<string | Screens[]> => {
    const isEstablishment = await this.prismaService.establishment.findUnique({
      where: {
        email: req.user.identify.toString(),
      },
    });

    const isEmployee = await this.prismaService.employee.findUnique({
      where: {
        login: req.user.identify.toString(),
      },

      include: {
        screeens: true,
      },
    });

    const allScreens = await this.prismaService.screens.findMany();

    return isEstablishment ? allScreens : isEmployee.screeens;
  };
}
