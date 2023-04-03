import { DishesService } from "@services/api/dishes"
import { useMutation } from "react-query"
import { useToast } from "@chakra-ui/react";
import { TUseDeleteImageDishe } from "./types";

export const useDeleteImageDishe = (): TUseDeleteImageDishe => {
    const useSnack = useToast();
    const fetchDeleteImage = useMutation((id: number) => DishesService.deleteImageDishe(id), {
        onError: (e: any) => {
            useSnack({
                title: "Error ao atualizar a foto do prato.",
                description: `${e.response?.data.message}`,
                status: "error",
                duration: 7000,
                isClosable: true,
            });
        }
    });

    return { fetchDeleteImage }
}