import React from "react";
import { Container } from "./styled";
import { Form } from "./styled";
import { Input } from "@chakra-ui/react";
import { Button } from "../../../components/Button";
import { useForm } from "react-hook-form";
import { IForm } from "./interfaces/IForm";

export const CreateAccountForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = ({
    confirmPassword,
    confirmTerms,
    cpfCnpj,
    email,
    name,
    password,
  }: IForm) => {
    
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
            {...register("cpfCnpj")}
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <Input
            placeholder="Digite uma senha"
            size="sm"
            type="password"
            id="password"
            {...register("password")}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <Input
            placeholder="Confirme sua senha"
            size="sm"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
        </div>

        <Button bgColor="red" fontColor="white" width="100%">
          Criar Conta
        </Button>
      </Form>
    </Container>
  );
};
