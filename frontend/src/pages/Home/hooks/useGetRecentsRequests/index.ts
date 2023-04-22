import { useToast } from "@chakra-ui/react";
import { RequestsService } from "@services/api/requests/RequestsService";
import { queryObject } from "@utils/queryObject";
import { useQuery } from "react-query";

export const useGetRecentsRequests = (qtd: number) => {
  const useSnack = useToast();
  const fetchRecentsRequests = useQuery(
    [queryObject.getRecentsRequests],
    async () => {
      const request = await RequestsService.getRecents(qtd);
      return request.data;
    },
    {
      onError: (e: any) => {
        useSnack({
          title: "Erro ao verificar os pedidos recentes",
          description: `${e.response?.data.message}`,
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      },
      refetchOnWindowFocus: true,
      refetchInterval: 15000,
    }
  );

  return {
    fetchRecentsRequests,
  };
};
