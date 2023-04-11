import { useQuery } from "react-query";
import { RequestsService } from "@services/api/requests/RequestsService";
import { queryObject } from "@utils/queryObject";

export const useGetRequestsStatus = (status: number) => {
  const fetchRequestsStatus = useQuery(
    [queryObject.getAllCategories],
    async () => {
      const request = await RequestsService.getByStatus(status);
      return request.data;
    },
    {
      onSuccess: (e) => {
        
      },

      onError: (e) => {
        
      },
    }
  );

  return {
    ...fetchRequestsStatus,
    dataRequests: fetchRequestsStatus.data,
    dataRequestsIsLoading: fetchRequestsStatus.isLoading,
  };
};
