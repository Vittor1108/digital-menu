import { ScreensService } from "@services/api/screens";
import { queryObject } from "@utils/queryObject";
import { useQuery } from "react-query";

export const useGetAllScreens = () => {
  const fetchAllScreens = useQuery([queryObject.getAllScreens], async () => {
    const request = await ScreensService.getAllScreens();
    return request.data;
  });

  return {
    fetchAllScreens,
  };
};
