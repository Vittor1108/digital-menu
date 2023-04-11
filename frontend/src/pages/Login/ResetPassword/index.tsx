import secureShield from "@assets/images/modal/secure-shield.png";
import { EmailIcon } from "@chakra-ui/icons";
import { Container, Input, InputGroup, InputRightElement, UseToastOptions } from "@chakra-ui/react";
import { FieldErrorMessage } from "@components/BaseForm/FieldErrorMessage";
import { Button } from "@components/Button";
import { GenericModal } from "@components/GenericModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackBar } from "@hooks/useSnackBar";
import { LoginService } from "@services/api/login/LoginService";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Form } from "./styled";

export const ResetPassword = (): JSX.Element => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const { verifyReponse } = useSnackBar();
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
      const snackOptions: UseToastOptions = {
        title: "Não foi possível resetar sua senha",
        description: `Email inválido.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      };
      verifyReponse<boolean>(response, snackOptions) ? false : setOpenModal(true);
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
