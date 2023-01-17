import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/PrismaService';
import bcrypt from 'src/utils/bcrypt';
import { User } from '../user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public validateUser = async (email: string, password: string) => {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    const employee = await this.prismaService.employee.findUnique({
      where: {
        email,
      },
    });

    console.log(employee);

    if (!user && !employee) {
      return null;
    }

    if (
      !(await bcrypt.comparePassword(password, user.password)) &&
      !(await bcrypt.comparePassword(password, employee.password))
    ) {
      return null;
    }
    return user;
  };

  public login = async (user: User) => {
    const payload = { sub: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  };
}
