import styled from "styled-components";

interface IProps {
  isOpen: boolean;
}

export const Container = styled.main<IProps>`
  width: ${(props) => (props.isOpen ? "100%" : "calc(100% - 250px)")};
  margin-left: ${(props) => (props.isOpen ? "0px" : "250px")};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  padding: 20px 0;
  min-height: 95vh;
  @media screen and (max-width: 1025px) {
    width: 100%;
    margin-left: 0px;
  }
`;
