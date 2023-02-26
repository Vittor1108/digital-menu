import React from "react";
import { IFieldErrorMessage } from "./interfaces/IFieldErrorMessage";
import { MessageError } from "./styled";

export const FieldErrorMessage = ({children}: IFieldErrorMessage): JSX.Element => {
  return <MessageError>{children}</MessageError>;
};
