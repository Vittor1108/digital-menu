import { ActiveAccount } from '../entities/active-account.entity';

export class CheckTokenActiveAccountDto extends ActiveAccount {
  token: string;
}
