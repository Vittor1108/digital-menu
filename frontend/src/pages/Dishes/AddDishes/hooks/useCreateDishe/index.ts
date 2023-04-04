import { IDishes } from "@interfaces/IDishes";
import { DishesService } from "@services/api/dishes";
import { useMutation } from "react-query";
import { TCreateDishe } from "./types";
import { useToast } from "@chakra-ui/react";

export const useCreateDishe = (): TCreateDishe => {
  const useSnack = useToast();
  const fetchCreateDishe = useMutation(
    (data: IDishes) => DishesService.createProduct(data),
    {
      onError: (e: any) => {
        useSnack({
          title: "Erro ao criar prato.",
          description: `${e.response.data.message}`,
          status: "warning",
          duration: 10000,
          isClosable: true,
        });
      },
    }
  );

  return { fetchCreateDishe };
};
