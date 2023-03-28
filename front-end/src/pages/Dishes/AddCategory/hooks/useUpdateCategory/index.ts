import { useToast } from "@chakra-ui/react";
import { CategorieService } from "@services/api/categories"
import { useMutation } from "react-query"

export const useUpdateCategory = () => {
    const useSnack = useToast();

    const updateCategory = useMutation((data: { id: number, name: string, description: string }) => CategorieService.update(Number(data.id), data), {
        onError: (e: any) => {
            useSnack({
                title: "Erro ao atualizar a categoria.",
                description: `${e.response.data.message}. Tente novamente`,
                status: "warning",
                duration: 10000,
                isClosable: true,
            });
        }
    });

    return [updateCategory]
}