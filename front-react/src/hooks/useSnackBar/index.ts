import { IUseSnackBar } from "./interfaces/IUseSnackBar";
import { useToast } from "@chakra-ui/react";
import { ApiException } from "../../services/api/ApiException";
import React from "react";
export const useSnackBar = () => {
  const useSnack = useToast();
  const [error, setError] = React.useState<boolean>(false);
  const snack = ({
    title,
    description,
    duration,
    isClosable,
    status,
    response,
  }: IUseSnackBar<any>) => {
    if (response instanceof ApiException) {
      useSnack({
        title,
        description,
        duration,
        isClosable,
        status,
      });

      setError(true);
    }
  };

  return {
    snack,
    error,
  };
};
