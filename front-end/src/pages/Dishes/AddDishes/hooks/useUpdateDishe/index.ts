import { useToast } from "@chakra-ui/react";
import { IDishes } from "@interfaces/IDishes";
import { DishesService } from "@services/api/dishes";
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { TUseUpdateDishe } from "./types";

export const useUpdateDishe = (): TUseUpdateDishe => {
    const useSnack = useToast();
    const fetchUpdateDishe = useMutation((data: IDishes) => DishesService.updatedDishe(Number(data.id!), data), {
        onError: (e: any) => {
            useSnack({
                title: "Error ao atualizar o produto.",
                description: `${e.response?.data.message}`,
                status: "error",
                duration: 7000,
                isClosable: true,
            });
        }
    });

    return { fetchUpdateDishe }
}