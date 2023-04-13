import { IRequests, IUpdatedRequest } from "@interfaces/IRequests";
import { ICardRequest } from "./interfaces";
import { EStatusRequest } from "@enums/EStatusRequest";
import { useUpdatedRequest } from "@pages/Requests/hooks/useUpdatedRequest";
import {
  CountRequests,
  SectionRequest,
  CardRequest,
} from "@pages/Requests/styled";
import { Container, Button } from "@chakra-ui/react";
import { GenericModal } from "@components/GenericModal";
import AlertIcon from "@assets/images/modal/alert.png";
import ConfirmIcon from "@assets/images/modal/confirme.png";
import React from "react";

export const CardRequestComponent = ({
  data,
  subTitleModal,
  titleModal,
  showCancel,
  textButton,
  actionProcced,
}: ICardRequest): JSX.Element => {
  const [modalCancel, setModalCancel] = React.useState<boolean>(false);
  const [modalProceed, setModalProceed] = React.useState<boolean>(false);
  const [requestClick, setClickRequest] = React.useState<IRequests | null>(
    null
  );
  const { fetchUpdatedRequest } = useUpdatedRequest();

  const onAction = (data: IRequests, action: EStatusRequest): void => {
    const params: IUpdatedRequest = {
      id: data.id!,
      customerName: data.customerName,
      comments: data.comments!,
      orders: data!.OrderedProduct!.map((element) => {
        return {
          idProduct: Number(element.product.id),
          qtd: Number(element.quantity),
        };
      }),
      status: action,
      timeReceived:
        action === EStatusRequest.PREPARATION ? new Date() : undefined,
      timePreparation:
        action === EStatusRequest.FINISHED ? new Date() : undefined,
      timeFinished:
        action === EStatusRequest.CONCLUDED ? new Date() : undefined,
    };

    fetchUpdatedRequest.mutate(params);
  };

  return (
    <>
      <CountRequests>
        <span>Total em Preparação: </span> {data.length}
      </CountRequests>
      <SectionRequest>
        {data.map((request, index) => {
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
                      {dataProduct.quantity} x {dataProduct.product.name}
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
                  {new Date(request.dateOrder).toLocaleTimeString()}
                </p>
              </div>
              <Container maxW="100%" padding="0">
                {showCancel && (
                  <Button
                    bgColor="black"
                    color="white"
                    fontWeight="normal"
                    borderRadius="4px"
                    fontSize="14px"
                    width={showCancel ? "120px" : "100%"}
                    marginRight="12px"
                    onClick={() => {
                      setModalCancel(true);
                      setClickRequest(request);
                    }}
                  >
                    Cancelar Pedido
                  </Button>
                )}
                <Button
                  bgColor="red"
                  color="white"
                  fontWeight="normal"
                  borderRadius="4px"
                  fontSize="14px"
                  width={showCancel ? "120px" : "100%"}
                  onClick={() => {
                    setModalProceed(true);
                    setClickRequest(request);
                  }}
                >
                  {textButton}
                </Button>
              </Container>
              <GenericModal
                isOpen={modalProceed}
                imagePath={ConfirmIcon}
                articleWidth="50%"
                title={titleModal}
                subTitle={subTitleModal}
                textConfirmButton="Confirmar"
                buttonColorConfirm="red"
                clickFunction={() => {
                  if (actionProcced) {
                    onAction(requestClick!, actionProcced);
                  }
                  setModalProceed(false);
                }}
                maxArticleWidth="450px"
              />
              <GenericModal
                isOpen={modalCancel}
                imagePath={AlertIcon}
                articleWidth="50%"
                title="Deseja Cancelar o pedido?"
                subTitle="O pedido será cancelado e não poderá ser restituido."
                textConfirmButton="Cancelar"
                buttonColorConfirm="black"
                textDenayButton="Confirmar"
                buttonColorDenay="red"
                clickFunction={(e: boolean) => {
                  if (e) {
                    onAction(requestClick!, EStatusRequest.CANCELED);
                  }
                  setModalCancel(false);
                }}
                maxArticleWidth="450px"
              />
            </CardRequest>
          );
        })}
      </SectionRequest>
    </>
  );
};
