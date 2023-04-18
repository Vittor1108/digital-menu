import { useToast } from "@chakra-ui/react";
import { AuthService } from "@services/api/auth";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const useValidationToken = () => {
  const navigate = useNavigate();
  const useSnack = useToast();
  const validateToken = useMutation((_) => AuthService.validateToken(), {
    onError: (err: any) => {
      useSnack({
        title: "Error.Tente novamente",
        description: `${err.response?.data.message}`,
        status: "error",
        duration: 7000,
        isClosable: true,
      });
      navigate("/");
    },
  });

  return {
    validateToken,
  };
};
