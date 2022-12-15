import { IsString } from 'class-validator';
import { User } from '../entity/user.entity';

export class ForgotPasswrodDto extends User {
  @IsString()
  email: string;
}
