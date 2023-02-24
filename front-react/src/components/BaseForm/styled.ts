import styled from "styled-components";
import { colors } from "../../config/colors";

export const Form = styled.form`
  width: 100%;

  label {
    display: block;
    font-size: 14px;
    color: ${colors.fontColor};
    margin-bottom: 8px;
  }

  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${colors.borderColorInput};
    color: ${colors.fontColorInput};
    border-radius: 3px;
  }

  a {
    color: ${colors.redPrimaryColor};
    font-size: 14px;
    text-decoration: none;
    transition: all 0.3s;

    &:hover {
      color: ${colors.blueColor};
      text-decoration: underline;
    }
  }
`;
