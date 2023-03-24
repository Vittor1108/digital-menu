import styled from "styled-components";
import { colors } from "../../config/colors";

export const Form = styled.form`
  width: 100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  height: 100%;
  label {
    display: block;
    font-size: 14px;
    color: ${colors.fontColor};
    margin-bottom: 8px;
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
