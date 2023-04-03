import styled, { css, keyframes } from "styled-components";
import { IStyledProps } from "./interface/IStyledProps";

const rotateAnimation = keyframes`
  from{
    transform: rotateX(90deg);
  }to{
    transform: rotateX(0deg);
  }
`;

export const Overlay = styled.div<IStyledProps>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  article {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: ${(props) => props.width};
    max-width: ${(props) => (props.maxWidth ? props.maxWidth : "100%")};
    animation: ${(props) => (props.isOpen ? rotateAnimation : false)} 0.3s
      linear forwards;
    div {
      margin-bottom: 15px;
      text-align: center;

      &:nth-child(3) {
        button {
          margin: 0px 10px;
        }
      }
    }

    img {
      margin: 0 auto;
      max-width: 70px;
    }

    h1 {
      margin-bottom: 10px;
      font-size: 24px;
    }

    p {
      font-size: 14px;
    }
  }
`;
