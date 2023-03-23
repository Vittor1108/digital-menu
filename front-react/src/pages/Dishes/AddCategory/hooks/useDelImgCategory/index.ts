import { CategorieService } from "@services/api/categories";
import { AxiosError } from "axios";
import { useMutation } from "react-query"
import { TUseDelImgCategory } from "./types";

export const useDelImgCategory = (): TUseDelImgCategory => {
    const delCategoryImg = useMutation((id: number) => CategorieService.deleteImage(id), {
        onError: (e: any) => {
            console.log(e);
        }
    });

    return [delCategoryImg]
}