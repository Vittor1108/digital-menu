import { createBrowserRouter } from "react-router-dom";
import { HomeRoutes } from "../pages/Home/routes";
import { LoginRotues } from "../pages/Login/routes";

const useRoutes = [...LoginRotues, ...HomeRoutes];
export const Routes = createBrowserRouter(useRoutes);

 