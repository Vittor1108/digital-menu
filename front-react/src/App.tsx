import Login from "./pages/Login/Index";
import GlobalStyle from "./styles/GlobalStyle";
import { HeaderComponent } from "./components/Header";
import { Navigation } from "./components/Nav";
function App() {
  return (
    <>
      <HeaderComponent />
      <Navigation />
      <GlobalStyle />
    </>
  );
}

export default App;
