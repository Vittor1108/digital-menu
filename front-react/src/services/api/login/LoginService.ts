import { ApiException } from "../ApiException";
import { Axios } from "../axiosConfig";
import { ICreateAccount } from "./interfaces/ICreateAccount";

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
    return new ApiException(e.response.data.message  || "Erro ao Logar. Tente Novamente");
  }
};

const validateToken = async (
  token: string
): Promise<boolean | ApiException> => {
  try {
    const { data } = await Axios().get("/auth");
    return data;
  } catch (e: any) {
    return new ApiException(e.response.data.message  || "Usuário não está logado.");
  }
};

const createAccount = async ({
  cpfCnpj,
  email,
  name,
  password,
}: ICreateAccount) => {
  try {
    const data = await Axios().post("/user", {
      cpfCnpj: cpfCnpj.replace(/\D+/g, ""),
      email,
      name,
      password,
    });
    return data;
  } catch (e: any) {
    return new ApiException(
      e.response.data.message || "Não foi possível criar sua conta."
    );
  }
};

export const LoginService = {
  validateUser,
  validateToken,
  createAccount,
};
