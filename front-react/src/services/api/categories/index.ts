import { ApiException } from "../ApiException";
import { Axios } from "../axiosConfig";
import { ICategorie } from "./interfaces/ICategorie";

const getAllCategories = (): Promise<ICategorie | ApiException> => {
  try {
    const { data } = Axios().get<ICategorie>("category/take=/skip=/text=");
    return data;
  } catch (e: any) {
    return new ApiException(
      e.response.data.message || "Usuário não está logado."
    );
  }
};
