import { useToast } from "@chakra-ui/react";
import { CategorieService } from "@services/api/categories";
import { useMutation } from "react-query"
import { TUseDelImgCategory } from "./types";

export const useDelImgCategory = (): TUseDelImgCategory => {
    const useSnack = useToast();

    const delCategoryImg = useMutation((id: number) => CategorieService.deleteImage(id), {
        onError: (e: any) => {
            useSnack({
                title: "Error",
                description: `${e.response.data.message}.`,
                status: "warning",
                duration: 10000,
                isClosable: true,
            });
        }
    });

    return [delCategoryImg]
}