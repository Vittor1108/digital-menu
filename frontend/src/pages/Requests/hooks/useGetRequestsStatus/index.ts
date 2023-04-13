import { useQuery } from "react-query";
import { RequestsService } from "@services/api/requests/RequestsService";
import { queryObject } from "@utils/queryObject";
import { useToast } from "@chakra-ui/react";


export const useGetRequestsStatus = (status: number) => {
  const useSnack = useToast();
  const fetchRequestsStatus = useQuery(
    [queryObject.getRequestsStatus],
    async () => {
      const request = await RequestsService.getByStatus(status);
      return request.data;
    },
    {
      onError: (e: any) => {
        useSnack({
          title: "Erro ao buscar pedidos.",
          description: `${e.response.data.message}. Tente novamente`,
          status: "warning",
          duration: 10000,
          isClosable: true,
        });
      },
      refetchOnWindowFocus: false,
      refetchInterval: 120000,
      
    },    
  );

  return {
    ...fetchRequestsStatus,
    dataRequests: fetchRequestsStatus.data,
    dataRequestsIsLoading: fetchRequestsStatus.isLoading,
  };
};
