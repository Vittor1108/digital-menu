import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/database/PrismaService';
import bcrypt from 'src/utils/bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
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
    if (!bcrypt.comparePassword(password, user.password)) {
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
