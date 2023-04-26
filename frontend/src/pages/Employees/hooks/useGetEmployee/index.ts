import { useToast } from "@chakra-ui/react";
import { EmployeeService } from "@services/api/employees";
import { useMutation } from "react-query";

export const useGetEmployee = () => {
  const useSnack = useToast();
  const fetchGetEmployee = useMutation(
    (id: number) => EmployeeService.get(id),
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
    fetchGetEmployee,
  };
};
