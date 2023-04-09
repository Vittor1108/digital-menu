import { BaseLayout } from "@components/BaseLayout";
import { Container } from "@chakra-ui/react";
import { Title } from "@components/TitleSection/styled";
import { SectionRequest, CardRequest } from "./styled";

export const RequestComponent = (): JSX.Element => {
  return (
    <BaseLayout isLoading={[false]}>
      <Container
        maxW="95%"
        background="white"
        padding="10px 16px"
        className="defaultBoxShadow"
      >
        <Title>Pedidos:</Title>
        <SectionRequest>
          <CardRequest>
            <h2>Mesa 1</h2>
            <h3>Ped. 1</h3>
            <ul>
              <li> 1x - Hamburguer De Queijo</li>
              <li>1x - Hamburguer De Queijo</li>
              <li>4x - Hamburguer De Queijo</li>
            </ul>
            <p>
              Observaçõe: Lorem ipsum dolor sit amet consectetur adipisicing
              elit.
            </p>
          </CardRequest>
        </SectionRequest>
      </Container>
    </BaseLayout>
  );
};
