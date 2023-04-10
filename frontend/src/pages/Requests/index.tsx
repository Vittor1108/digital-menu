import { BaseLayout } from "@components/BaseLayout";
import { Container } from "@chakra-ui/react";
import { Title } from "@components/TitleSection/styled";
import { SectionRequest, CardRequest } from "./styled";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useGetRequestsStatus } from "./hooks/useGetRequestsStatus";

export const RequestComponent = (): JSX.Element => {
  const {dataRequests} = useGetRequestsStatus();

  console.log(dataRequests);
  return (
    <BaseLayout isLoading={[false]}>
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
                <CardRequest className="defaultBoxShadow">
                  <div>
                    <h2>
                      <span>1º</span> Mesa 12
                    </h2>
                    <h3>Ped #1322321</h3>
                  </div>
                  <ul>
                    <li> 1x - Hamburguer De Queijo</li>
                    <li>1x - Hamburguer De Queijo</li>
                    <li>4x - Hamburguer De Queijo</li>
                  </ul>
                  <p>
                    <span> Observações:</span> Lorem ipsum dolor sit amet
                    consectetur adipisicing elit.
                  </p>
                  <div className="info">
                    <p>
                      <span>Garçom: </span> Vittor Daniel
                    </p>
                    <p>
                      <span>Nome Cliente:</span> Mariana Silva
                    </p>
                    <p>
                      <span>Hora Pedido:</span> 08:20
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
                  <Container >
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
              </SectionRequest>
            </TabPanel>
            <TabPanel>
              <SectionRequest>
                <CardRequest>
                  <h2>Mesa 1</h2>
                  <h3>Ped. 1</h3>
                  <ul>
                    <li> 1x - Hamburguer De Queijo</li>
                    <li>1x - Hamburguer De Queijo</li>
                    <li>4x - Hamburguer De Queijo</li>
                  </ul>
                  <p>
                    Observaçõe: Lorem ipsum dolor sit amet consectetur
                    adipisicing elit.
                  </p>
                </CardRequest>
              </SectionRequest>
            </TabPanel>
            <TabPanel>
              <SectionRequest>
                <CardRequest>
                  <h2>Mesa 1</h2>
                  <h3>Ped. 1</h3>
                  <ul>
                    <li> 1x - Hamburguer De Queijo</li>
                    <li>1x - Hamburguer De Queijo</li>
                    <li>4x - Hamburguer De Queijo</li>
                  </ul>
                  <p>
                    Observaçõe: Lorem ipsum dolor sit amet consectetur
                    adipisicing elit.
                  </p>
                </CardRequest>
              </SectionRequest>
            </TabPanel>
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
