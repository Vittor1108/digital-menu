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

    if (!user && !employee) {
      return null;
    }

    if (user && !(await bcrypt.comparePassword(password, user.password))) {
      return null;
    }

    if (
      employee &&
      !(await bcrypt.comparePassword(password, employee.password))
    ) {
      return null;
    }

    return user ? user : employee;
  };

  public login = async (req: IReq) => {
    const payload = { sub: req.user.id, email: req.user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  };
}
