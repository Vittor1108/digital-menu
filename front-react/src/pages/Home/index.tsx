import React from "react";
import { HeaderComponent } from "../../components/Header";
import { Navigation } from "../../components/Nav";

export const HomeComponent = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  return (
    <>
      <HeaderComponent
        openMenu={() => setOpenMenu(!openMenu)}
        isOpen={openMenu}
      />
      <Navigation isOpen={openMenu} />
    </>
  );
};
