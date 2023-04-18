import { Container, Input } from "@chakra-ui/react";
import { Button } from "@components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { FieldErrorMessage } from "../../../components/BaseForm/FieldErrorMessage";
import { Form, Title } from "./styled";
import { useLogin } from "@hooks/useLogin";

const schemaForm = yup
  .object({
    login: yup.string().required("Login é obrigatório"),
    password: yup.string().required("Senha é obrigatório"),
  })
  .required();

export const LoginForm = (): JSX.Element => {
  const { loginRequest } = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ login: string; password: string; keepPassword: boolean }>({
    resolver: yupResolver(schemaForm),
  });

  const onSubmit = async ({
    login,
    password,
    keepPassword,
  }: {
    login: string;
    password: string;
    keepPassword: boolean;
  }) => {
    loginRequest.mutate(
      { login, password },
      {
        onSuccess: (res) => {
          keepPassword
            ? localStorage.setItem("token", res.data.token)
            : sessionStorage.setItem("token", res.data.token);
          navigate("/");
        },
      }
    );
  };

  return (
    <Container>
      <Title>Acesse sua conta</Title>
      <p>Digite seu email e senha para continuar</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="login">Login</label>
          <Input
            placeholder="Login"
            size="sm"
            type="text"
            id="login"
            {...register("login", { required: true })}
          />
          <FieldErrorMessage>{errors.login?.message}</FieldErrorMessage>
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <Input
            placeholder="Senha"
            size="sm"
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
          <FieldErrorMessage>{errors.password?.message}</FieldErrorMessage>
        </div>
        <Container
          display="flex"
          alignItems="center"
          margin="10px auto"
          padding="0"
        >
          <input
            type="checkbox"
            id="keepPassowrd"
            {...register("keepPassword")}
          />
          <label
            htmlFor="keepPassowrd"
            style={{ marginBottom: "0", marginLeft: "8px" }}
          >
            Manter-se logado?
          </label>
        </Container>
        <div>
          <Link to="/login/reset-password">Esqueceu a senha?</Link>
        </div>
        <Button bgColor="red" fontColor="white" width="100%">
          Entrar
        </Button>
        <div>
          <span>
            Não possui conta?{" "}
            <Link to="/login/create-account">Criar Conta</Link>
          </span>
        </div>
      </Form>
    </Container>
  );
};
