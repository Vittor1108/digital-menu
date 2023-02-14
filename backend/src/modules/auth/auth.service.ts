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
    email: string,
    password: string,
  ): Promise<User> => {
    const user = await this.prismaService.establishment.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    if (user && !(await bcrypt.comparePassword(password, user.password))) {
      return null;
    }

    return user;
  };

  public login = async (req: IReq) => {
    const payload = { sub: req.user.id, email: req.user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  };
}
