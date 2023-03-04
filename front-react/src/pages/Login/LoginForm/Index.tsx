import { Container } from "./styled";
import { Form } from "./styled";
import { Button } from "../../../components/Button";
import { Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FieldErrorMessage } from "../../../components/BaseForm/FieldErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginService } from "../../../services/api/login/LoginService";
import { ApiException } from "../../../services/api/ApiException";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export const LoginForm = (): JSX.Element => {
  const navigate = useNavigate();
  const snackBar = useToast();

  const schemaForm = yup
    .object({
      login: yup.string().required("Login é obrigatório"),
      password: yup.string().required("Senha é obrigatório"),
    })
    .required();

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
    LoginService.validateUser(login, password).then((response) => {
      if (response instanceof ApiException) {
        snackBar({
          title: "Credenciais inválidas",
          description: "Login ou senha inválidos. Tente novamente.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      !keepPassword
        ? sessionStorage.setItem("token", response.token)
        : localStorage.setItem("token", response.token);

      navigate("/");
    });
  };

  return (
    <Container>
      <h1>Acesse sua conta</h1>
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
        <div>
          <input
            type="checkbox"
            id="keepPassowrd"
            {...register("keepPassword")}
          />
          <label htmlFor="keepPassowrd">Manter-se logado?</label>
        </div>
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
