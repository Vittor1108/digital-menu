import { useMutation } from "react-query";
import { DishesService } from "@services/api/dishes";
import { IFiles } from "@interfaces/IFiles"
import { TUseCreateImageDishe } from "./types";


export const useCreateImageDishe = (): TUseCreateImageDishe => {
    const createDisheImage = useMutation((data: IFiles) => DishesService.createImageProduct(data));

    return { createDisheImage }
}