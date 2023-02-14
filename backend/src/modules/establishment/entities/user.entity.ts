export class User {
  id?: number;
  email: string;
  password?: string;
  cpfCnpj: string;
  tokenActiveAccount?: string;
  activeAccount?: boolean;
  tokenForgotPassword?: string;
  created_at?: Date;
  updeated_at?: Date;
}
