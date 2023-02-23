import { BrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "./router";
import GlobalStyle from "./styles/GlobalStyle";

const App = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={Routes} />
    </>
  );
};

export default App;
