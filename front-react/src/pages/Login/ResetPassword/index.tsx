import React from "react";
import { Container } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Form } from "./styled";
import { EmailIcon } from "@chakra-ui/icons";
import { Button } from "../../../components/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FieldErrorMessage } from "../../../components/BaseForm/FieldErrorMessage";
import { LoginService } from "../../../services/api/login/LoginService";
import { ApiException } from "../../../services/api/ApiException";
import { useToast } from "@chakra-ui/react";
import { GenericModal } from "../../../components/GenericModal";
import secureShield from "../../../assets/images/modal/secure-shield.png";
import { useNavigate } from "react-router-dom";
import { useSnackBar } from "../../../hooks/useSnackBar";

export const ResetPassword = (): JSX.Element => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const { snack, error } = useSnackBar();
  const schemaForm = yup.object({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schemaForm),
  });

  const onSubmit = ({ email }: { email: string }): void => {
    LoginService.forgotPassword(email).then((response) => {
      snack({
        title: "Usário inválido",
        description: "Não Existe usuário com este email",
        duration: 5000,
        isClosable: true,
        response,
        status: "error",
      });
    });
  };

  const onCloseModal = (): void => {
    setOpenModal(false);
    navigate("/login");
  };

  return (
    <Container maxW="466px" width="100%">
      <h1>Esqueceu sua conta?</h1>
      <p>Preencha os dados abaixo e acesse sua conta</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <InputGroup>
            <Input
              type="text"
              placeholder="Email"
              id="email"
              size="sm"
              {...register("email")}
            />
            <InputRightElement
              pointerEvents="none"
              children={<EmailIcon />}
              h="full"
            />
          </InputGroup>
          <FieldErrorMessage>{errors.email?.message}</FieldErrorMessage>
        </div>
        <div>
          <Button width="100%" bgColor="red" fontColor="white">
            Reenviar Senha
          </Button>
        </div>
      </Form>
      <GenericModal
        isOpen={openModal}
        imagePath={secureShield}
        title="Email enviado"
        subTitle="Clique no link enviado no seu email para recuperar a senha"
        articleWidth="420px"
        textConfirmButton="Confirmar"
        clickFunction={onCloseModal}
      />
    </Container>
  );
};
