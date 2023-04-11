import {
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { Title } from "@components/TitleSection/styled";
import { IRequests } from "@interfaces/IRequests";
import moment from "moment";
import { useGetRequestsStatus } from "./hooks/useGetRequestsStatus";
import { useUpdatedRequest } from "./hooks/useUpdatedRequest";
import { CardRequest, SectionRequest } from "./styled";
import { EStatusRequest } from "@enums/EStatusRequest";
import { GenericModal } from "@components/GenericModal";
import AlertIcon from "@assets/images/modal/alert.png";
import React from "react";

const formatDate = (hour: Date) => {
  moment.locale("pt-br");
  return moment(hour).format("HH:mm");
};

export const RequestComponent = (): JSX.Element => {
  const [modalCancel, setModalCancel] = React.useState<boolean>(false);
  const requestsRecevid = useGetRequestsStatus(0);
  const { fetchUpdatedRequest } = useUpdatedRequest();

  const onCancel = (data: IRequests): void => {
    const params = {
      id: data.id!,
      customerName: data.customerName,
      comments: data.comments,
      orders: data.OrderedProduct?.map((element) => {
        return {
          idProduct: Number(element.product.id),
          qtd: Number(element.quantity),
        };
      }),
      status: EStatusRequest[4],
    };
    fetchUpdatedRequest.mutate(params);
  };

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
                          <span>Nome Cliente:</span> {request.customerName}
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
                          width="120px"
                          marginRight="12px"
                          onClick={() => setModalCancel(true)}
                        >
                          Cancelar Pedido
                        </Button>
                        <Button
                          bgColor="red"
                          color="white"
                          fontWeight="normal"
                          borderRadius="4px"
                          fontSize="14px"
                          width="120px"
                        >
                          Preparar
                        </Button>
                      </Container>
                      <GenericModal
                        isOpen={modalCancel}
                        imagePath={AlertIcon}
                        articleWidth="50%"
                        title="Deseja cancelar o pedido?"
                        subTitle="O pedido será cancelado e não será possível reverter"
                        textConfirmButton="Cancelar"
                        textDenayButton="Confirmar"
                        buttonColorDenay="red"
                        buttonColorConfirm="black"
                        clickFunction={(e: boolean) => {
                          if (e) {
                            onCancel(request);
                          }
                          setModalCancel(false);
                        }}
                        maxArticleWidth="450px"
                      />
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
