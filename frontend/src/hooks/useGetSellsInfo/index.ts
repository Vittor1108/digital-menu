import { DishesService } from "@services/api/dishes";
import { queryObject } from "@utils/queryObject";
import { useQuery } from "react-query";
import { ESellsInfo } from "@enums/ESellsInfo";

export const useGetSellsInfo = (paramDate: ESellsInfo) => {
  const fetchSellsInfo = useQuery(
    [queryObject.getSellsInfo],
    async () => {
      const request = await DishesService.sellsAccount();
      return request.data;
    },
    {
      onError: (e: any) => {},
    }
  );

  return {
    fetchSellsInfo,
  };
};

const genDate = (
  paramDate: ESellsInfo
): { finalDate: Date; initialDate: Date } | undefined => {
  const date = new Date();
  const year = date.getFullYear();
  const dateToday = date.getDate();
  const month = date.getMonth();
  const weekDay = date.getDay();
  const firstDayWeek = new Date(date);
  firstDayWeek.setDate(date.getDate() - weekDay);
  const lastDayWeek = new Date(date);
  lastDayWeek.setDate(date.getDate() + (6 - weekDay));

  switch (paramDate) {
    case ESellsInfo.TODAY:
      return {
        finalDate: new Date(year, month, dateToday + 1),
        initialDate: new Date(year, month, dateToday + 1),
      };

    case ESellsInfo.ALL:
      return undefined;

    case ESellsInfo.MONTH:
      return {
        finalDate: new Date(year, month + 1, 0),
        initialDate: new Date(year, month, 1),
      };

    case ESellsInfo.WEEK:
      return {
        finalDate: lastDayWeek,
        initialDate: firstDayWeek,
      };

    case ESellsInfo.YEAR:
      return {
        finalDate: new Date(year, 0, 1),
        initialDate: new Date(year, 11, 30),
      };

    default:
      return {
        finalDate: new Date(),
        initialDate: new Date(),
      };
  }
};
