import { IScreens } from "@interfaces/IScreens";

export interface IEmployee {
  id?: number;
  name: string;
  login?: string;
  cpf: string;
  password: string;
  acessScreens: number[];
  screeens?: IScreens[]
}
