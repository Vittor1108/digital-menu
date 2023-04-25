import { EmployeeService } from "@services/api/employees";
import { useMutation } from "react-query";
import { IEmployee } from "@services/api/employees/interfaces";
import { useToast } from "@chakra-ui/react";

export const useCreateEmployee = () => {
  const useSnack = useToast();
  const requestCreateEmployee = useMutation(
    (data: IEmployee) => EmployeeService.create(data),
    {
      onSuccess: (data) => {
        console.log(data);
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
