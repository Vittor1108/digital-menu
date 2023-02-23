import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import { HeaderComponent } from "./components/Header";
import { Navigation } from "./components/Nav";

function App() {
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <>
      <HeaderComponent
        openMenu={() => setOpenMenu(!openMenu)}
        isOpen={openMenu}
      />
      <Navigation isOpen={openMenu} />
      <GlobalStyle />
    </>
  );
}

export default App;
