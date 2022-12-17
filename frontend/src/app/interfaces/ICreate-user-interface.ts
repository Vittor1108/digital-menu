export interface ICreateUser{
  firstName: string;
  lastName: string;
  cpfCnpj: string;
  email: string;
  password: string;
  confirmPassword: string;
  check: boolean;
}

export interface IReturnCreateUser{
  id: number,
  email: string;
  password: string;
  cpf_cnpj: string;
  tokenActiveAccount: string;
  tokenForgotPassword: string;
  activeAccount: string;
  created_at: Date;
  updeated_at: Date;
}
