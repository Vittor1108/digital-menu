import { useToast } from "@chakra-ui/react";
import { AuthService } from "@services/api/auth";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const useInfoUser = () => {
  const navigate = useNavigate();
  const useSnack = useToast();
  const infoUser = useMutation((_) => AuthService.infoUser(), {
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
    infoUser,
  };
};
