export interface IEmploye {
  id?: number;
  name: string;
  email: string;
  password: string;
  activeAccount?: boolean;
  admission_date?: Date;
  resignation_date?: Date;
  screeens: IScreens[];
  EmployeePhoto?: Iphoto[];
  user_id?: number;
}

export interface IScreens {
  id: number;
  name: string;
  surname: string;
}
interface Iphoto {
  id: number;
  filename: string;
  originalname: string;
  url: string;
}
