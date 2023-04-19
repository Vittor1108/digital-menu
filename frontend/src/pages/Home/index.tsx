import { AppContext } from "@/Contexts/AppContext";
import { BaseLayout } from "@components/BaseLayout";
import { useInfoUser } from "@hooks/useinfoUser";
import React from "react";
import { Container } from "@chakra-ui/react";

export const HomeComponent = () => {
  const token = sessionStorage.getItem("token")
    ? sessionStorage.getItem("token")
    : localStorage.getItem("token");
  const { state, setState } = React.useContext(AppContext);
  const { infoUser } = useInfoUser();

  if (token) {
    React.useEffect(() => {
      infoUser.mutate((function () {})(), {
        onSuccess: (res) => {
          setState({
            ...state,
            screens: res.data.screens,
            nameUser: res.data.nameUser,
          });
        },
      });
    }, []);
  }

  return (
    <>
      <BaseLayout isLoading={[false]}>
        <Container
          maxW="100%"
          padding="0 15px"
          minH="85vh"
        >
          <h1
            style={{
              fontSize: "32px",
              marginBottom: "2rem",
              fontWeight: "500",
            }}
          >
            Bem vindo {state.nameUser}
          </h1>
        </Container>
      </BaseLayout>
    </>
  );
};
