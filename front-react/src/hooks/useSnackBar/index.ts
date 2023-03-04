import { ApiException } from "@services/api/ApiException";
import { useToast, UseToastOptions } from "@chakra-ui/react";
export const useSnackBar = () => {
  const snackBar = useToast();
  const verifyReponse = (
    response: boolean | ApiException,
    { description, title, status, duration, isClosable }: UseToastOptions
  ): boolean => {
    if (response instanceof ApiException) {
      snackBar({
        title: "Não foi possível resetar sua senha",
        description: `Email inválido.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return true;
    }

    return false;
  };

  return {
    verifyReponse,
  };
};
