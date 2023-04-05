import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import bcrypt from 'src/utils/bcrypt';
import { User } from '../reset-password/entity/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public validateUser = async (
    login: string,
    password: string,
  ): Promise<User> => {
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

    return user;
  };

  public login = async (req: IReq) => {
    const payload = {
      sub: req.user.id,
      email: req.user.email,
      establishmentId: req.user.establishmentId
        ? req.user.establishmentId
        : req.user.id,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  };

  public validateToken = async (req: IReq) => {
    return 'OK';
  };
}
