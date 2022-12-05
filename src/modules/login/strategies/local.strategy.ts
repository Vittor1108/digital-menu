import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginService } from '../login.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginService: LoginService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.loginService.validate(email, password);
    if (!user) {
      console.log('Caiu no if');
      throw new UnauthorizedException('Login or Email invalid');
    }

    if (!user.activeAccount) {
      throw new UnauthorizedException('User not active Account');
    }
    return user;
  }
}
