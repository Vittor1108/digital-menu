import { DishesRoutes } from "@pages/Dishes/_routes";
import { createBrowserRouter } from "react-router-dom";
import { HomeRoutes } from "../pages/Home/_routes";
import { LoginRotues } from "../pages/Login/_routes";
import { RequestsRoutes } from "@pages/Requests/_route";

const useRoutes = [...LoginRotues, ...HomeRoutes, ...DishesRoutes, ...RequestsRoutes];
export const Routes = createBrowserRouter(useRoutes);

 