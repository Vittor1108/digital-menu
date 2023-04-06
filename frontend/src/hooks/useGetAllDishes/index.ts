import { useToast } from "@chakra-ui/react";
import { IPagination } from "@interfaces/IPagination";
import { DishesService } from "@services/api/dishes";
import { queryObject } from "@utils/queryObject";
import { useQuery } from "react-query";

export const useGetllDishes = (dataGet: IPagination) => {
  const useSnack = useToast();
  const fetechDishes = useQuery(
    [queryObject.getAllDishes],
    async () => {
      const request = await DishesService.getAll(dataGet);
      return request.data;
    },
    {
      onError: (e: any) => {
        useSnack({
          title: "Error.Tente novamente",
          description: `${e.response?.data.message}`,
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      },
    }
  );

  return {
    ...fetechDishes,
    dataFecthDishes: fetechDishes.data,
    dishesIsLoading: fetechDishes.isLoading,
  };
};
