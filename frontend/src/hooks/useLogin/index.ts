import { useToast } from "@chakra-ui/react";
import { LoginService } from "@services/api/login/LoginService";
import { useMutation } from "react-query";
import { TUseLogin } from "./types";

export const useLogin = () => {
  const useSnack = useToast();
  const loginRequest = useMutation(
    (data: { login: string; password: string }) =>
      LoginService.validateUser(data.login, data.password),
    {
      onError: (err: any) => {
        useSnack({
          title: "Error ao logar",
          description: `${err.response?.data.message}`,
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      },
    }
  );

  return {
    loginRequest,
  };
};
