import styled from "styled-components";

interface IProps {
  isOpen: boolean;
}

export const Header = styled.header<IProps>`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: ${(props) => (props.isOpen ? "100%" : "calc(100% - 250px)")};
  margin-left: ${(props) => (props.isOpen ? "0px" : "250px")};
  padding: 15px 0;
  transition: all 0.3s;
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;

    .iconMenu {
      cursor: pointer;
      span {
        border: 1px solid #007bff;
        height: 2px;
        display: block;
        margin-bottom: 5px;
        transition: all 0.3s;
        &:nth-child(1) {
          width: 20px;
        }
        &:nth-child(2) {
          width: 15px;
        }

        &:nth-child(3) {
          width: 10px;
        }
      }
      &:hover {
        > span {
          width: 20px;
        }
      }
    }

    ul {
      display: flex;
      align-items: center;

      li {
        &:nth-child(1),
        &:nth-child(2) {
          margin-right: 40px;
        }
      }

      .mail,
      .bell {
        max-width: 22px;
      }

      .user {
        max-width: 30px;
      }

      @media screen and (max-width: 1025px) {
        display: none;
      }
    }

    .iconMenuProfile {
      display: none;
      cursor: pointer;
      span {
        border: 1px solid #007bff;
        height: 2px;
        display: block;
        margin-bottom: 5px;
        transition: all 0.3s;
        width: 20px;
      }

      @media screen and (max-width: 1025px) {
        display: block;
      }
    }
  }

  @media screen and (max-width: 1025px) {
    width: 100%;
    margin-left: 0px;
  }
`;
