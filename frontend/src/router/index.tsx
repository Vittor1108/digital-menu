import { DishesRoutes } from "@pages/Dishes/_routes";
import { createBrowserRouter } from "react-router-dom";
import { HomeRoutes } from "../pages/Home/_routes";
import { LoginRotues } from "../pages/Login/_routes";
import { RequestsRoutes } from "@pages/Requests/_route";
import { EmployeesRoutes } from "@pages/Employees/_routes";

const useRoutes = [
  ...LoginRotues,
  ...HomeRoutes,
  ...DishesRoutes,
  ...RequestsRoutes,
  ...EmployeesRoutes,
];
export const Routes = createBrowserRouter(useRoutes);
