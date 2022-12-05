import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { compareSync } from 'bcrypt';
@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}
  public validate = async (email: string, password: string): Promise<any> => {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  };

  public login = (user) => {
    const payload = { sub: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  };
}
