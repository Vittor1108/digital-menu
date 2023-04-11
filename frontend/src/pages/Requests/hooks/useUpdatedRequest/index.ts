import { IRequests } from "@interfaces/IRequests";
import { RequestsService } from "@services/api/requests/RequestsService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TUseUpdatedRequest } from "./types";
import { useToast } from "@chakra-ui/react";
import { queryObject } from "@utils/queryObject";

export const useUpdatedRequest = (): TUseUpdatedRequest => {
  const useSnack = useToast();
  const queryMutation = useQueryClient();
  const fetchUpdatedRequest = useMutation(
    (data: IRequests) => RequestsService.update(data, data.id!),
    {
      onSuccess: (e) => {
        queryMutation.invalidateQueries([queryObject.getRequestsStatus]);
      },

      onError: (e: any) => {
        useSnack({
          title: "Erro ao cancelar o pedido.",
          description: `${e.response.data.message}. Tente novamente`,
          status: "warning",
          duration: 10000,
          isClosable: true,
        });
      },
    }
  );

  return {
    fetchUpdatedRequest,
  };
};
