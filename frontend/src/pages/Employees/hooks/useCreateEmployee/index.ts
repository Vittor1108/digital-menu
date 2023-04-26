import { EmployeeService } from "@services/api/employees";
import { useMutation } from "react-query";
import { IEmployee } from "@services/api/employees/interfaces";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const useCreateEmployee = () => {
  const useSnack = useToast();
  const navigate = useNavigate();
  const requestCreateEmployee = useMutation(
    (data: IEmployee) => EmployeeService.create(data),
    {
      onSuccess: (data) => {
          // navigate(`/employee/${data.data.id}`);
          useSnack({
            title: "Funcionário Cadastrado!",
            description: `Funcionário cadastrado com sucesso!`,
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
    requestCreateEmployee
  }
};
