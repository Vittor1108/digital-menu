import styled from "styled-components";
import { Form as FormComponet } from "../../../components/BaseForm/styled";
import { colors } from "../../../config/colors";

export const Container = styled.div`
  width: 100%;
  max-width: 450px;
`;

export const Form = styled(FormComponet)`
  margin-top: 16px;

  div {
    margin-bottom: 12px;
    &:nth-child(3) {
      display: flex;
      align-items: center;
      label {
        margin-bottom: 0;
        margin-left: 10px;
      }
    }
  }

  span {
    text-align: center;
    margin-top: 8px;
    display: block;
    font-size: 14px;
    color: ${colors.fontColor};
  }
`;
