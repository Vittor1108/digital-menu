import styled from "styled-components";
import { Form as FormBase } from "../../../pages/Login/LoginForm/styled";

export const Container = styled.div`
  width: 100%;
  max-width: 450px;
`;

export const Form = styled(FormBase)`
  div {
    &:nth-child(3) {
      display: block;

      label {
        margin-left: 0;
        margin-bottom: 8px;
      }
    }
  }
`;
