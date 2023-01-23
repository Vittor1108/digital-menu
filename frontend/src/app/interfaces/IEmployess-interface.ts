export interface IEmploye {
  id: number;
  name: string;
  email: string;
  password: string;
  activeAccount: boolean;
  admission_date: Date;
  resignation_date?: Date;
  screeens: {
    id: number;
    name: string;
  };
  user_id: number;
}
