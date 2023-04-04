import { CategorieService } from "@services/api/categories";
import { useMutation, useQueryClient } from "react-query";
import { TUseDeleteCategory } from "./types";
import { queryObject } from "@utils/queryObject";
import { useToast } from "@chakra-ui/react";

export const useDeleteCategory = (): TUseDeleteCategory => {
  const queryClient = useQueryClient();
  const useSnack = useToast();

  const deleteCategory = useMutation(
    (id: number) => CategorieService.deleteCategory(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryObject.getAllCategories]);
        useSnack({
          title: "Categoria excluida!",
          description: `Categoria Excluida com sucesso.`,
          status: "success",
          duration: 50000,
          isClosable: true,
        });
      },

      onError: (e: any) => {
        useSnack({
          title: "Erro ao excluir a categoria.",
          description: `${e.response.data.message}`,
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      },
    }
  );

  return {
    deleteCategory,
  };
};
