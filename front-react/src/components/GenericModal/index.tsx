import { Overlay } from "./styled";
import { Button } from "../Button";
import React from "react";
import { IGenericModal } from "./interface/IGenericModal";

export const GenericModal = ({
  imagePath,
  subTitle,
  title,
  buttonColor,
  buttonWidth,
  fontColor,
}: IGenericModal): JSX.Element => {
  return (
    <Overlay>
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
            bgColor={buttonColor ? buttonColor : "red"}
            fontColor={fontColor ? fontColor : "white"}
            width={buttonWidth ? buttonWidth : "120px"}
          >
            Confirmar
          </Button>
        </div>
      </article>
    </Overlay>
  );
};
