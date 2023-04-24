import { AppContext } from "@/Contexts/AppContext";
import Teste from "@assets/images/uploads/prato1.jpg";
import {
  Button,
  Container,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { ESellsInfo } from "@enums/ESellsInfo";
import { useGetAllRequests } from "@hooks/useGetAllRequests";
import { useGetSellsInfo } from "@hooks/useGetSellsInfo";
import { useInfoUser } from "@hooks/useinfoUser";
import React from "react";
import { BsArrowUpShort } from "react-icons/bs";
import { useGetRecentsRequests } from "./hooks/useGetRecentsRequests";
import { CardInfo, ImageTable, TrendingOrders } from "./styles";
import { useGetMoreOrders } from "@hooks/useGetMoreOrders";

export const HomeComponent = () => {
  const token = sessionStorage.getItem("token")
    ? sessionStorage.getItem("token")
    : localStorage.getItem("token");
  const { state, setState } = React.useContext(AppContext);
  const { infoUser } = useInfoUser();
  const { fetchSellsInfo } = useGetSellsInfo(ESellsInfo.ALL);
  const { fetchAllRequest } = useGetAllRequests();
  const { fetchRecentsRequests } = useGetRecentsRequests(5);
  const { fetchGetMoreOrders } = useGetMoreOrders();

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
        isLoading={[
          fetchSellsInfo.isLoading,
          fetchAllRequest.isLoading,
          fetchRecentsRequests.isLoading,
          fetchAllRequest.isLoading,
          fetchGetMoreOrders.isLoading,
        ]}
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
            justifyContent="space-between"
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
          <Container
            marginTop="32px"
            maxW="calc(100% - 32px)"
            backgroundColor="white"
            className="defaultBoxShadow"
          >
            <Container
              display="flex"
              borderBottom="1px solid rgba(0,0,0,0.1);"
              maxW="100%"
              alignItems="center"
              justifyContent="space-between"
              padding="24px"
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Pedidos Recentes
              </p>
              <Button
                backgroundColor="red"
                color="white"
                fontWeight="normal"
                borderRadius="3px"
                fontSize="12px"
              >
                Ver Todos
              </Button>
            </Container>
            <Table verticalAlign="middle">
              <Thead>
                <Tr>
                  <Th textAlign="center" color="black">
                    Prato
                  </Th>
                  <Th textAlign="center" color="black">
                    Preço
                  </Th>
                  <Th textAlign="center" color="black">
                    ID do prato
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {fetchRecentsRequests.data?.map((element) => {
                  return (
                    <Tr key={element.id}>
                      <Td
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <ImageTable src={element.ProductPhoto![0].url} />
                        {element.name}
                      </Td>
                      <Td textAlign="center">
                        {element.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Td>
                      <Td textAlign="center">{element.id}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Container>
          <Container
            maxW="calc(100% - 32px)"
            marginTop="32px"
            backgroundColor="white"
            className="defaultBoxShadow"
          >
            <Container
              borderBottom="1px solid rgba(0,0,0,0.1);"
              maxW="100%"
              padding="24px"
            >
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Mais Pedidos
              </p>
            </Container>
            <Container
              maxW="100%"
              display="flex"
              alignItems="center"
              padding="24px 0"
              justifyContent="center"
            >
              {fetchGetMoreOrders.data?.slice(0, 5).map((e, index) => {
                return (
                  <TrendingOrders key={index}>
                    <div>
                      <img src={e.product.ProductPhoto[0].url} />
                    </div>
                    <div>
                      <h6>{e.product.name}</h6>
                      <span>
                        {e.product.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                      <div>
                        <p>
                          Pedidos: <span>{e.sellsQuantity}</span>
                        </p>
                        <p>
                          Lucro:{" "}
                          <span>
                            {e.sellsQuantity.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                  </TrendingOrders>
                );
              })}
            </Container>
          </Container>
        </Container>
      </BaseLayout>
    </>
  );
};
