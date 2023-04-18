import { AddEmployeeComponent } from "../AddEmployee";
import { LoginGuard } from "@/router/guards/LoginGuard";
export const EmployeesRoutes = [
  {
    element: <LoginGuard><AddEmployeeComponent /></LoginGuard>,
    path: "/employee",
  },
];
