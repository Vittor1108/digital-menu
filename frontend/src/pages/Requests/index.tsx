import { BaseLayout } from "@components/BaseLayout";
import { Container } from "@chakra-ui/react";
import { Title } from "@components/TitleSection/styled";
import { SectionRequest, CardRequest } from "./styled";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useGetRequestsStatus } from "./hooks/useGetRequestsStatus";
import React from "react";
import moment from "moment";

const formatDate = (hour: Date) => {
  moment.locale("pt-br");
  return moment(hour).format("HH:mm");
};

export const RequestComponent = (): JSX.Element => {
  const requestsRecevid = useGetRequestsStatus(0);

  return (
    <BaseLayout isLoading={[requestsRecevid.isLoading]}>
      <Container
        maxW="95%"
        background="white"
        padding="16px"
        className="defaultBoxShadow"
      >
        <Title>Status Pedidos:</Title>
        <Tabs
          marginTop="10px"
          align="center"
          isFitted
          variant="enclosed-colored"
        >
          <TabList>
            <Tab _selected={{ color: "red" }}>Recebidos</Tab>
            <Tab _selected={{ color: "red" }}>Em preparação</Tab>
            <Tab _selected={{ color: "red" }}>Finalizados</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SectionRequest>
                {requestsRecevid.data?.map((request, index) => {
                  return (
                    <CardRequest className="defaultBoxShadow" key={index}>
                      <div>
                        <h2>
                          <span>{index + 1}º</span> Mesa 12
                        </h2>
                        <h3>Ped #{request.id}</h3>
                      </div>
                      <ul>
                        {request.OrderedProduct?.map((dataProduct, index) => {
                          return (
                            <li key={index}>
                              {dataProduct.quantity} x{" "}
                              {dataProduct.product.name}
                            </li>
                          );
                        })}
                      </ul>
                      <p style={{ textAlign: "left" }}>
                        <span> Observações:</span>
                        {request.comments ? request.comments : ""}
                      </p>
                      <div className="info">
                        <p>
                          <span>Garçom: </span> Vittor Daniel
                        </p>
                        <p>
                          <span>Nome Cliente:</span> Mariana Silva
                        </p>
                        <p>
                          <span>Hora Pedido:</span>{" "}
                          {formatDate(request.dateOrder)}
                        </p>
                      </div>
                      <div className="time">
                        <p>
                          <span>Tempo Recebido:</span> 00:00
                        </p>
                        <p>
                          <span>Tempo Total:</span> 00:00
                        </p>
                      </div>
                      <Container>
                        <Button
                          bgColor="black"
                          color="white"
                          fontWeight="normal"
                          borderRadius="4px"
                          fontSize="14px"
                          width="100px"
                          marginRight="12px"
                        >
                          Detalhes
                        </Button>
                        <Button
                          bgColor="red"
                          color="white"
                          fontWeight="normal"
                          borderRadius="4px"
                          fontSize="14px"
                          width="100px"
                        >
                          Preparar
                        </Button>
                      </Container>
                    </CardRequest>
                  );
                })}
              </SectionRequest>
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </BaseLayout>
  );
};

// enum Status {
//   RECEIVED
//   PREPARATION
//   FINISHED
//   CONCLUDED
// }
