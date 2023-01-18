import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import bcrypt from 'src/utils/bcrypt';
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

  public login = async (req: IReq) => {
    const payload = { sub: req.user.id, email: req.user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  };
}
