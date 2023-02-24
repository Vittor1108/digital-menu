import { Container } from "./styled";
import { Form } from "./styled";
import { Button } from "../../../components/Button";
import { Input } from "@chakra-ui/react";
export const LoginForm = (): JSX.Element => {
  return (
    <Container>
      <h1>Acesse sua conta</h1>
      <p>Digite seu email e senha para continuar</p>
      <Form>
        <div>
          <label htmlFor="login">Login</label>
          {/* <input type="text" placeholder="Login" id="login" /> */}
          <Input
            placeholder="large size"
            width="100%"
            isInvalid
            errorBorderColor="red.300"
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input type="password" placeholder="Senha" id="password" />
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
