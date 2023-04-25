import { useToast } from "@chakra-ui/react";
import { EmployeeService } from "@services/api/employees";
import { queryObject } from "@utils/queryObject";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteEmployee = () => {
  const useSnack = useToast();
  const queryClient = useQueryClient();
  const fetchDeleteEmployee = useMutation(
    (id: number) => EmployeeService.deleted(id),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries([queryObject.getAllEmployees]);
      },
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
    fetchDeleteEmployee,
  };
};
