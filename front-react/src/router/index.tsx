import { createBrowserRouter } from "react-router-dom";
import { HomeRoutes } from "../pages/Home/_routes";
import { LoginRotues } from "../pages/Login/_routes";

const useRoutes = [...LoginRotues, ...HomeRoutes];
export const Routes = createBrowserRouter(useRoutes);

 