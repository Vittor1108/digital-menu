import { Container } from "./styled";
import { Form } from "./styled";
import { Button } from "../../../components/Button";
import { Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FieldErrorMessage } from "../../../components/BaseForm/FieldErrorMessage";
export const LoginForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ login: string; password: string }>();

  const onSubmit = (dataUser: { login: string; password: string }) => {
    console.log(dataUser);
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
            {...register("login", { required: true })}
          />
          {errors.login && <FieldErrorMessage>Login é obrigatório</FieldErrorMessage>}
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <Input
            placeholder="Senha"
            size="sm"
            type="password"
            {...register("password", { required: true })}
            // {errors.password && <FieldErrorMessage>Senha é obrigatória</FieldErrorMessage>}
          />
        </div>
        <div>
          <input type="checkbox" id="keepPassowrd" />
          <label htmlFor="keepPassowrd">Manter-se logado?</label>
        </div>
        <div>
          <a href="">Esqueceu a senha?</a>
        </div>
        <Button bgColor="red" fontColor="white" width="100%">
          Entrar
        </Button>
        <div>
          <span>
            Não possui conta? <a href="">Criar Conta</a>
          </span>
        </div>
      </Form>
    </Container>
  );
};
