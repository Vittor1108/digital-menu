import { Outlet } from "react-router-dom";
import { Container } from "./styled";

const LoginComponent = (): JSX.Element => {
  return (
    <>
      <Container>
        <section></section>
        <section>
          <Outlet/>
        </section>
      </Container>
    </>
  );
};

export default LoginComponent;
