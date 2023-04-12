import AlertIcon from "@assets/images/modal/alert.png";
import ConfirmIcon from "@assets/images/modal/confirme.png";
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
import { GenericModal } from "@components/GenericModal";
import { Title } from "@components/TitleSection/styled";
import { EStatusRequest } from "@enums/EStatusRequest";
import { IRequests } from "@interfaces/IRequests";
import moment from "moment";
import React from "react";
import { useGetRequestsStatus } from "./hooks/useGetRequestsStatus";
import { useUpdatedRequest } from "./hooks/useUpdatedRequest";
import { CardRequest, CountRequests, SectionRequest } from "./styled";

const formatDate = (hour: Date) => {
  moment.locale("pt-br");
  return moment(hour).format("HH:mm");
};

export const RequestComponent = (): JSX.Element => {
  const [modalCancel, setModalCancel] = React.useState<boolean>(false);
  const [modalProceed, setModalProceed] = React.useState<boolean>(false);
  const [modalFinish, setModalFinish] = React.useState<boolean>(false);
  const [modalConclued, setModalConclued] = React.useState<boolean>(false);
  const [numberStatus, setNumberStatus] = React.useState<number>(0);
  const [requestClick, setRequestClick] = React.useState<IRequests | null>(
    null
  );
  const requestsRecevid = useGetRequestsStatus(numberStatus);
  const { fetchUpdatedRequest } = useUpdatedRequest();

  const onAction = (data: IRequests, action: number): void => {
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
      status: EStatusRequest[action],
    };
    fetchUpdatedRequest.mutate(params);
  };

  React.useEffect(() => {
    requestsRecevid.refetch();
  }, [numberStatus]);

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
          onChange={(index) => {
            setNumberStatus(index);
          }}
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
              <CountRequests>
                <span>Total Recebidos: </span> {requestsRecevid.data?.length}
              </CountRequests>
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
                          onClick={(e) => {
                            setRequestClick(request);
                          }}
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
                          onClick={() => {
                            setModalProceed(true);
                            setRequestClick(request);
                          }}
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
                            onAction(requestClick!, 4);
                          }
                          setModalCancel(false);
                        }}
                        maxArticleWidth="450px"
                      />
                      <GenericModal
                        isOpen={modalProceed}
                        imagePath={ConfirmIcon}
                        articleWidth="50%"
                        title="Prepração Iniciada!"
                        subTitle="A prepração do pedido foi iniciada!"
                        textConfirmButton="Confirmar"
                        buttonColorConfirm="red"
                        clickFunction={(e: boolean) => {
                          if (!e) {
                            onAction(requestClick!, 1);
                          }
                          setModalProceed(false);
                        }}
                        maxArticleWidth="450px"
                      />
                    </CardRequest>
                  );
                })}
              </SectionRequest>
            </TabPanel>
            <TabPanel>
              <CountRequests>
                <span>Total em Preparação: </span>{" "}
                {requestsRecevid.data?.length}
              </CountRequests>
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
                          bgColor="red"
                          color="white"
                          fontWeight="normal"
                          borderRadius="4px"
                          fontSize="14px"
                          width="100%"
                          onClick={() => {
                            setModalFinish(true);
                            setRequestClick(request);
                          }}
                        >
                          Finalizar
                        </Button>
                      </Container>
                      <GenericModal
                        isOpen={modalFinish}
                        imagePath={ConfirmIcon}
                        articleWidth="50%"
                        title="Pedido Finalizado!"
                        subTitle="O pedido foi finalizado, aguarde o garçom responsável retirar o pedido!"
                        textConfirmButton="Confirmar"
                        buttonColorConfirm="red"
                        clickFunction={(e: boolean) => {
                          if (!e) {
                            onAction(requestClick!, 2);
                          }
                          setModalFinish(false);
                        }}
                        maxArticleWidth="450px"
                      />
                    </CardRequest>
                  );
                })}
              </SectionRequest>
            </TabPanel>
            <TabPanel>
              <CountRequests>
                <span>Total em Preparação: </span>{" "}
                {requestsRecevid.data?.length}
              </CountRequests>
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
                          <span>Tempo Finalizado:</span> 00:00
                        </p>
                        <p>
                          <span>Tempo Total:</span> 00:00
                        </p>
                      </div>
                      <Container>
                        <Button
                          bgColor="red"
                          color="white"
                          fontWeight="normal"
                          borderRadius="4px"
                          fontSize="14px"
                          width="100%"
                          onClick={() => {
                            setModalConclued(true);
                            setRequestClick(request);
                          }}
                        >
                          Acionar Garçom
                        </Button>
                      </Container>
                      <GenericModal
                        isOpen={modalConclued}
                        imagePath={ConfirmIcon}
                        articleWidth="50%"
                        title="Garçom Acionado!"
                        subTitle="O garçom responsável foi chamado! Aguarde a retirada do pedido!"
                        textConfirmButton="Confirmar"
                        buttonColorConfirm="red"
                        clickFunction={(e: boolean) => setModalConclued(false)}
                        maxArticleWidth="450px"
                      />
                    </CardRequest>
                  );
                })}
              </SectionRequest>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </BaseLayout>
  );
};
