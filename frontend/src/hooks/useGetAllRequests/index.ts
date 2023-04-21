import { RequestsService } from "@services/api/requests/RequestsService";
import { queryObject } from "@utils/queryObject";
import { useQuery } from "react-query";

export const useGetAllRequests = () => {
  const fetchAllRequest = useQuery(
    [queryObject.getAllRequests],
    async () => {
      const request = await RequestsService.getAll();
      return request.data;
    },
    {
      refetchInterval: 15000,
    }
  );

  return {
    fetchAllRequest,
  };
};
