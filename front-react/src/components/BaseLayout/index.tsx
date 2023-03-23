import { Container } from "./styled";
import { HeaderComponent } from "@components/Header";
import { Navigation } from "@components/Nav";
import { Spinner } from "@chakra-ui/react";
import React from "react";

export const BaseLayout = ({
  children,
  isLoading,
}: {
  children: React.ReactElement[] | React.ReactElement;
  isLoading: boolean[];
}): JSX.Element => {
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);

  return (
    <>
      <HeaderComponent
        openMenu={() => setOpenMenu(!openMenu)}
        isOpen={openMenu}
      />

      <Container isOpen={openMenu}>
        {isLoading.includes(true) ? <Spinner color="red.500" size="xl" /> : children}
      </Container>
      <Navigation isOpen={openMenu} />
    </>
  );
};
