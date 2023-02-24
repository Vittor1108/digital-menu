import styled from "styled-components";

interface IProps {
  bgColor: string;
  fontColor: string;
  width: string;
}

export const Button = styled.button<IProps>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};
  width: ${(props) => props.width};
  border: 1px solid ${(props) => props.bgColor};
  border-radius: 0.25rem;
  text-align: center;
  font-size: 14px;
  padding: 0.625rem 1rem;
  transition: filter 0.3s;
  &:hover {
    filter: brightness(90%);
  }
`;
