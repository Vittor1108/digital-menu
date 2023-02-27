import { ApiException } from "../ApiException";
import { Axios } from "../axiosConfig";

const validateUser = async (
  login: string,
  password: string
): Promise<{ token: string } | ApiException> => {
  try {
    const { data } = await Axios().post<{ token: string }>("/auth", {
      email: login,
      password,
    });
    return data;
  } catch (e: any) {
    return new ApiException(e.message || "Erro ao Logar. Tente Novamente");
  }
};

const validateToken = async (token: string) => {
  try {
    const { data } = await Axios().get("/auth");
    return data;
  } catch (e: any) {
    return new ApiException(e.message || "Usuário não está logado.");
  }
};

export const LoginService = {
  validateUser,
  validateToken,
};
