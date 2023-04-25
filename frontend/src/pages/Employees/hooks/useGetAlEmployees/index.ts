import { useToast } from "@chakra-ui/react";
import { IPagination } from "@interfaces/IPagination";
import { EmployeeService } from "@services/api/employees";
import { queryObject } from "@utils/queryObject";
import { useQuery } from "react-query";

export const useGetAllEmployees = (dataGet: IPagination) => {
  const useSnack = useToast();
  const fetchGetAllEmployees = useQuery(
    [queryObject.getAllEmployees],
    async () => {
      const request = await EmployeeService.getAll(dataGet);
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
    fetchGetAllEmployees,
  };
};
