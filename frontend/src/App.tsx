import { BrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "./router";
import GlobalStyle from "./styles/GlobalStyle";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalContext } from "./Contexts";
const App = (): JSX.Element => {
  return (
    <>
      <GlobalContext>
        <ChakraProvider>
          <GlobalStyle />
          <RouterProvider router={Routes} />
        </ChakraProvider>
      </GlobalContext>
    </>
  );
};

export default App;
