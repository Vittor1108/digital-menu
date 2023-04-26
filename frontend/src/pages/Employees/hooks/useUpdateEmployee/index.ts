import { useToast } from "@chakra-ui/react";
import { EmployeeService } from "@services/api/employees";
import { IEmployee } from "@services/api/employees/interfaces";
import { useMutation } from "react-query";

export const useUpdateEmployee = () => {
  const useSnack = useToast();
  const fetchUpdateEmployee = useMutation(
    (data: IEmployee) => EmployeeService.update(data.id!, data),
    {
      onSuccess: () => {
        useSnack({
          title: "Funcionário Atualizado!",
          description: `Funcionário Atualizado com sucesso!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
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
    fetchUpdateEmployee
  }
};
