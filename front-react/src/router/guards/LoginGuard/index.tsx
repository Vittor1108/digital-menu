import { HomeComponent } from "../../../pages/Home";
import { LoginService } from "../../../services/api/login/LoginService";
import { ILoginGuard } from "./interfaces/ILoginGuard";

export const LoginGuard = async ({ children }: ILoginGuard) => {
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");

  const teste = await LoginService.validateToken(token!);

  if (teste) {
    return children;
  }

  return <HomeComponent />;
};
