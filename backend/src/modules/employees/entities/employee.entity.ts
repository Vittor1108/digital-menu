export class Employee {
  id?: number;
  name: string;
  login: string;
  password?: string;
  activeAccount: boolean;
  establishmentId: number;
  admissionDate: Date;
  resignationDate: Date;
  screeens?: Array<{ id: number; name: string; surname: string }>;
}
