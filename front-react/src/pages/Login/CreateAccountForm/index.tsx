import { Input, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import * as yup from "yup";
import { Button } from "../../../components/Button";
import { ApiException } from "../../../services/api/ApiException";
import { LoginService } from "../../../services/api/login/LoginService";
import { IForm } from "./interfaces/IForm";
import { Container, Form } from "./styled";
import { GenericModal } from "../../../components/GenericModal";
import mailImage from "../../../assets/images/modal/mail.png";
export const CreateAccountForm = (): JSX.Element => {
  const [valueInput, setValueInput] = React.useState("");

  const snackBar = useToast();

  const schemaForm = yup
    .object({
      name: yup.string().required("Nome do estabelecimento é obrigatório"),
      email: yup
        .string()
        .email()
        .required("Email do estabelecimento é obrigatório"),
      cpfCnpj: yup
        .string()
        .trim()
        .matches(
          /[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}|[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}/,
          "CPF ou CNPJ inválido"
        )
        .required("CPF ou CNPJ é obrigatório"),
      password: yup
        .string()
        .min(6, "Senha precisa de no mínimo 6 dígitos")
        .required("Senha é obrigatório"),
      confirmPasword: yup
        .string()
        .required("Confirmar senha é obrigatório")
        .oneOf([yup.ref("password")], "As senham devem coinciderem"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schemaForm),
  });

  const onSubmit = (dataUser: IForm) => {
    LoginService.createAccount(dataUser).then((response) => {
      if (response instanceof ApiException) {
        // snackBar({
        //   title: "Não foi possível criar sua conta",
        //   description: `${response}.`,
        //   status: "error",
        //   duration: 5000,
        //   isClosable: true,
        // });
        // return;
        console.log("OK");
      }
    });
  };

  return (
    <Container>
      <h1>Crie sua Conta</h1>
      <p>Preencha os dados para criar a sua conta</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nome do Estabelecimento</label>
          <Input
            placeholder="Nome do estabelecimento"
            size="sm"
            type="text"
            id="name"
            {...register("name")}
          />
        </div>
        <div>
          <label htmlFor="email">Email do Estabelecimento</label>
          <Input
            placeholder="email@teste.com"
            size="sm"
            type="text"
            id="email"
            {...register("email")}
          />
        </div>
        <div>
          <label htmlFor="cpfCnpj">CNPJ ou CPF</label>
          <Input
            placeholder="CPF ou CNPJ do estabelecimento"
            size="sm"
            type="text"
            id="cpfCnpj"
            as={InputMask}
            mask={
              valueInput.length < 15 ? "999.999.999-999" : "99.999.999/0001-99"
            }
            maskChar={null}
            {...register("cpfCnpj")}
            onChange={(e) => setValueInput(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <Input
            placeholder="*******"
            size="sm"
            type="password"
            id="password"
            {...register("password")}
          />
        </div>
        <div>
          <label htmlFor="confirmPasword">Confirmar Senha</label>
          <Input
            placeholder="*******"
            size="sm"
            type="password"
            id="confirmPasword"
            {...register("confirmPasword")}
          />
        </div>
        <Button bgColor="red" fontColor="white" width="100%">
          Criar Conta
        </Button>
      </Form>
      <GenericModal
        imagePath={mailImage}
        subTitle="Por favor confirme seu email para prosseguir"
        title="Conta criada!"
      ></GenericModal>
    </Container>
  );
};
