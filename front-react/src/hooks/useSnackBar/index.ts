import { ApiException } from "@services/api/ApiException";
import { useToast, UseToastOptions } from "@chakra-ui/react";
export const useSnackBar = () => {
  const snackBar = useToast();
  const verifyReponse = <T>(response: ApiException | T, { description, title, status, duration, isClosable }: UseToastOptions
  ): boolean => {
    if (response instanceof ApiException) {
      snackBar({
        title,
        description,
        status,
        duration,
        isClosable,
      });
      return true;
    }

    return false;
  };

  return {
    verifyReponse,
  };
};
