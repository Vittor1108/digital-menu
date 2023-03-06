import { Container } from "@chakra-ui/react";
import { Title } from "./styled";

export const TitleSection = ({ children }: { children: string }) => {
  return (
    <Container
      w="100%"
      maxW="100%"
      padding="1.5rem"
      borderBottom=" 1px solid rgba(0,0,0,0.1)"
    >
      <Title>{children}</Title>
    </Container>
  );
};
