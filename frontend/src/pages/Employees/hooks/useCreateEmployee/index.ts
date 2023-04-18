import { EmployeeService } from "@services/api/employees";
import { useMutation } from "react-query";
import { IEmployee } from "@services/api/employees/interfaces";

export const useCreateEmployee = () => {
  const requestCreateEmployee = useMutation(
    (data: IEmployee) => EmployeeService.create(data),
    {
      onSuccess: (data) => {
        console.log(data);
      },

      onError: (e: any) => {
        console.log(e);
      },
    }
  );

  return {
    requestCreateEmployee
  }
};
