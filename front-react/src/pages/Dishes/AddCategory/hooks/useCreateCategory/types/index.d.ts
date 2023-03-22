import { IForm } from "../../../interfaces/IForm";
import { UseMutationResult } from "react-query";
import { ICategorie } from "@interfaces/ICategorie";


export type TUseCreateCategory = [
    createCategory: UseMutationResult<AxiosResponse<ICategorie, any>, any, IForm, unknown>,
    createImageCategory: UseMutationResult<AxiosResponse<boolean, any>, unknown, IFiles, unknown>,
]

