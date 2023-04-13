import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { Title } from "@components/TitleSection/styled";
import { EStatusRequest } from "@enums/EStatusRequest";
import React from "react";
import { CardRequestComponent } from "./components/CardRequest";
import { useGetRequestsStatus } from "./hooks/useGetRequestsStatus";

export const RequestComponent = (): JSX.Element => {
  const [numberStatus, setNumberStatus] = React.useState<number>(0);
  const requestsRecevid = useGetRequestsStatus(numberStatus);

  React.useEffect(() => {
    requestsRecevid.refetch();
  }, [numberStatus]);

  return (
    <BaseLayout isLoading={[requestsRecevid.isFetching]}>
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
          onChange={(index: number) => setNumberStatus(index)}
          defaultIndex={numberStatus === 0 ? 0 : numberStatus}
        >
          <TabList>
            <Tab _selected={{ color: "red" }}>Recebidos</Tab>
            <Tab _selected={{ color: "red" }}>Em preparação</Tab>
            <Tab _selected={{ color: "red" }}>Finalizados</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CardRequestComponent
                data={
                  requestsRecevid.data! &&
                  requestsRecevid.data[0]! &&
                  requestsRecevid.data![0].status === EStatusRequest.RECEIVED
                    ? requestsRecevid.data!
                    : []
                }
                titleModal="Prepração Iniciada!"
                subTitleModal="A prepração do pedido foi iniciada!"
                textButton="Preparar"
                actionProcced={EStatusRequest.PREPARATION}
                showCancel={true}
              />
            </TabPanel>
            <TabPanel>
              <CardRequestComponent
                data={
                  requestsRecevid.data! &&
                  requestsRecevid.data[0]! &&
                  requestsRecevid.data![0].status === EStatusRequest.PREPARATION
                    ? requestsRecevid.data!
                    : []
                }
                titleModal="O Pedido foi finalizado!"
                subTitleModal="O pedido foi finalziado, aguarde o garçom responsável realizar a retirada."
                textButton="Finalizar Pedido"
                actionProcced={EStatusRequest.FINISHED}
                showCancel={false}
              />
            </TabPanel>
            <TabPanel>
              <CardRequestComponent
                data={
                  requestsRecevid.data! &&
                  requestsRecevid.data[0]! &&
                  requestsRecevid.data![0].status === EStatusRequest.FINISHED
                    ? requestsRecevid.data!
                    : []
                }
                titleModal="Aguarde o Garçom!"
                subTitleModal="Pedido já finalizado e garçom responsável acionado!"
                textButton="Acionar Garçom"
                showCancel={false}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </BaseLayout>
  );
};
