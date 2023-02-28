import { HomeComponent } from "..";
import { LoginGuard } from "../../../router/guards/LoginGuard";

export const HomeRoutes = [
  {
    element: <LoginGuard>{<HomeComponent />}</LoginGuard>,
    path: "/",
  },
];
