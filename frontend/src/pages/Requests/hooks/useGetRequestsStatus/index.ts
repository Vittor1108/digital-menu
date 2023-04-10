import { useQuery } from "react-query";
import { RequestsService } from "@services/api/requests/RequestsService";
import { queryObject } from "@utils/queryObject";

export const useGetRequestsStatus = () => {
  const fetchRequestsStatus = useQuery(
    [queryObject.getAllCategories],
    async () => {
      const request = await RequestsService.getByStatus(1);
      return request.data;
    },
    {
      onSuccess: (e) => {
        console.log(e);
      },

      onError: (e) => {
        console.log(e);
      },
    }
  );

  return {
    ...fetchRequestsStatus,
    dataRequests: fetchRequestsStatus.data,
    dataRequestsIsLoading: fetchRequestsStatus.isLoading,
  };
};
