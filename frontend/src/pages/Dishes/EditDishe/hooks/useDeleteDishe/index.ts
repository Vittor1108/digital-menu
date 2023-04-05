import { useToast } from "@chakra-ui/react";
import { DishesService } from "@services/api/dishes";
import { useMutation, useQueryClient } from "react-query";
import { queryObject } from "@utils/queryObject";
import { TUseDeleteDishe } from "./types";

export const useDeleteDishe = (): TUseDeleteDishe => {
  const useSnack = useToast();
  const queryClient = useQueryClient();
  const deleteDishe = useMutation(
    (id: number) => DishesService.deleteDishe(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryObject.getAllDishes]);
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
    deleteDishe,
  };
};
