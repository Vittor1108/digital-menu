import { useToast } from "@chakra-ui/react";
import { ICategorie } from "@interfaces/ICategorie";
import { IFiles } from "@interfaces/IFiles";
import { CategorieService } from "@services/api/categories";
import { useMutation } from "react-query";
import { IForm } from "../../interfaces/IForm";
import { TUseCreateCategory } from "./types";

export const useCreateCategory = (): TUseCreateCategory => {

    const useSnack = useToast();

    const createCategory = useMutation((dataCategory: IForm) => CategorieService.createCategory(dataCategory), {
        onError: (e: any) => {
            useSnack({
                title: "Erro ao criar categoria.",
                description: `${e.response.data.message}. Tente novamente.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    });

    const createImageCategory = useMutation((dataFiles: IFiles) => CategorieService.createImageCategory(dataFiles), {
        onSuccess: () => {
            useSnack({
                title: "Categoria Criada com sucesso.",
                description: "Categoria Criada/Atualizada com sucesso.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        },

        onError: (e: any) => {
            useSnack({
                title: "Categoria criada",
                description: `${e.response.data.message}`,
                status: "warning",
                duration: 10000,
                isClosable: true,
            });
        }
    })


    return [createCategory, createImageCategory]
}

