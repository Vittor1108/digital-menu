import styled from "styled-components";
import defaultLogin from "../../assets/images/default-login.jpg";
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  section {
    width: 50%;
    height: 100vh;

    &:nth-child(1) {
      background-image: url(${defaultLogin});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;

      @media screen and (max-width: 1025px) {
        display: none;
      }
    }

    &:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: center;

      @media screen and (max-width: 1025px) {
        width: 85%;
      }
    }
  }
`;
