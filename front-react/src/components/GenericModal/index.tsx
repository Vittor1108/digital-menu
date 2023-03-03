import { Overlay } from "./styled";
import { Button } from "../Button";
import React from "react";
import { IGenericModal } from "./interface/IGenericModal";

export const GenericModal = ({
  imagePath,
  subTitle,
  title,
  buttonColorConfirm,
  buttonColorDenay,
  buttonWidth,
  fontColorConfirm,
  fontColorDeny,
  articleWidth,
  maxArticleWidth,
  textConfirmButton,
  textDenayButton,
  isOpen,
  clickFunction,
}: IGenericModal): JSX.Element => {
  const teste = (resultModal: true | undefined) => {
    if (clickFunction) {
      clickFunction(resultModal);
    }
  };
  return (
    <Overlay width={articleWidth} maxWidth={maxArticleWidth} isOpen={isOpen}>
      <article>
        <div>
          <img src={imagePath} alt="" />
        </div>
        <div>
          <h1>{title}</h1>
          <p>{subTitle}</p>
        </div>
        <div>
          <Button
            bgColor={buttonColorConfirm ? buttonColorConfirm : "red"}
            fontColor={fontColorConfirm ? fontColorConfirm : "white"}
            width={buttonWidth ? buttonWidth : "120px"}
            onClickFunction={() => teste(undefined)}
          >
            {textConfirmButton}
          </Button>
          {textDenayButton && (
            <Button
              bgColor={buttonColorDenay ? buttonColorDenay : "red"}
              fontColor={fontColorDeny ? fontColorDeny : "white"}
              width={buttonWidth ? buttonWidth : "120px"}
              onClickFunction={() => {
                if (clickFunction) {
                  clickFunction(true);
                }
              }}
            >
              {textDenayButton}
            </Button>
          )}
        </div>
      </article>
    </Overlay>
  );
};
