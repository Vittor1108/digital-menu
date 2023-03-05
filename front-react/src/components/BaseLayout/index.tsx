import { Container } from "./styled";
import { HeaderComponent } from "@components/Header";
import { Navigation } from "@components/Nav";
import React from "react";

export const BaseLayout = ({
  children,
}: {
  children: React.ReactElement[] | React.ReactElement;
}): JSX.Element => {
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  return (
    <>
      <HeaderComponent
        openMenu={() => setOpenMenu(!openMenu)}
        isOpen={openMenu}
      />

      <Container isOpen={openMenu}>{children}</Container>
      <Navigation isOpen={openMenu} />
    </>
  );
};
