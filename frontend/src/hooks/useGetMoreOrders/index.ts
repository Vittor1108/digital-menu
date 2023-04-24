import { useToast } from "@chakra-ui/react";
import { RequestsService } from "@services/api/requests/RequestsService";
import { queryObject } from "@utils/queryObject";
import { useQuery } from "react-query";

export const useGetMoreOrders = () => {
  const useSnack = useToast();

  const fetchGetMoreOrders = useQuery(
    [queryObject.getMoreRequests],
    async () => {
      const request = await RequestsService.getMoreOrdes();
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
    fetchGetMoreOrders,
  };
};
