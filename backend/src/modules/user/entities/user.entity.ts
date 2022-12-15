export class User {
  id?: number;
  email: string;
  password?: string;
  cpf_cnpj: string;
  tokenActiveAccount?: string;
  activeAccount?: boolean;
  tokenForgotPassword?: string;
  created_at?: Date;
  updeated_at?: Date;
}
