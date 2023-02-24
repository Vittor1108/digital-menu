import { ApiException } from "../ApiException";
import { Axios } from "../axiosConfig";

const validateUser = async (
  email: string,
  password: string
): Promise<{ token: string } | ApiException> => {
  try {
    const { data } = await Axios().post<{ token: string }>("/auth", {
      email,
      password,
    });
    return data;
  } catch (e: any) {
    return new ApiException(e.message || "Erro ao Logar. Tente Novamente");
  }
};

export const LoginService = {
  validateUser,
};
