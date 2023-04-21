import { AppContext } from "@/Contexts/AppContext";
import { Container } from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { useInfoUser } from "@hooks/useinfoUser";
import React from "react";
import { CardInfo } from "./styles";
import { BsArrowUpShort } from "react-icons/bs";
import { useGetSellsInfo } from "@hooks/useGetSellsInfo";
import { ESellsInfo } from "@enums/ESellsInfo";
import { useGetAllRequests } from "@hooks/useGetAllRequests";

export const HomeComponent = () => {
  const token = sessionStorage.getItem("token")
    ? sessionStorage.getItem("token")
    : localStorage.getItem("token");
  const { state, setState } = React.useContext(AppContext);
  const { infoUser } = useInfoUser();
  const { fetchSellsInfo } = useGetSellsInfo(ESellsInfo.ALL);
  const { fetchAllRequest } = useGetAllRequests();

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
      <BaseLayout
        isLoading={[fetchSellsInfo.isLoading, fetchAllRequest.isLoading]}
      >
        <Container maxW="100%" padding="0 15px" minH="85vh">
          <h1
            style={{
              fontSize: "32px",
              marginBottom: "2rem",
              fontWeight: "500",
            }}
          >
            Bem vindo {state.nameUser}
          </h1>
          <Container
            maxW="100%"
            display="flex"
            alignItems="center"
            justifyContent="space"
          >
            <CardInfo color="black">
              <div>
                <p>Gráfico de Vendas</p>
                <span>
                  3.2%{" "}
                  <BsArrowUpShort size={18} style={{ marginLeft: "4px" }} />
                </span>
              </div>
              <div>
                <h3>
                  {fetchSellsInfo.data?.valueSales.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h3>
                <p>Gráfico aqui</p>
              </div>
            </CardInfo>
            <CardInfo color="red">
              <div>
                <p>Quantidade de vendas</p>
                <span>
                  3.2%{" "}
                  <BsArrowUpShort size={18} style={{ marginLeft: "4px" }} />
                </span>
              </div>
              <div>
                <h3>{fetchAllRequest.data?.length}</h3>
                <p>Gráfico aqui</p>
              </div>
            </CardInfo>
          </Container>
        </Container>
      </BaseLayout>
    </>
  );
};
