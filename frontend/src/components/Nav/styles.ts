import styled from "styled-components";
//COLORS
import { colors } from "../../config/colors";

interface IProps {
  openMenu: boolean;
}

interface ILi {
  route: boolean;
}

export const NavigationMenu = styled.nav<IProps>`
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  transition: transform 0.3s;
  ${({ openMenu }) =>
    openMenu &&
    `
    transform: translateX(-100%);
  `}

  > ul {
    .treeMenu {
      flex-wrap: wrap;
      ul {
        width: 100%;
        padding-top: 10px;
        max-height: 0;
        transform: rotateX(90deg);
        transition: transform 0.3s;
        li {
          background-color: ${colors.graySecondary};
          padding: 20px 0 20px 45px;
          margin: 0;
          transition: color 0.3s;
          a {
            color: #000000de;
            font-size: 14px;
            transition: color 0.3s;
            &:hover {
              color: ${colors.redPrimaryColor};
            }
          }

          &:nth-child(1) {
            text-align: left;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1025px) {
    transform: translateX(-100%);
  }
  .show {
    transform: rotateX(0) !important;
    max-height: 300px !important;
  }
`;

export const ItemList = styled.li<ILi>`
  padding: 15px 0;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.3s;
  color: ${(props) => (props.route ? "red" : "black")};
  &:nth-child(1) {
    text-align: center;
    background-color: ${colors.graySecondary};
    display: block;
    border: none;
    padding: 0;
    img {
      max-width: 150px;
      padding: 9px 0;
      margin: 0 auto;
    }
  }

  > div {
    display: flex;
    align-items: center;
    padding-left: 15px;
    margin-bottom: 10px;

    p {
      margin-left: 15px;
    }
  }

  > svg {
    margin-right: 10px;
  }

  &:hover {
    color: ${colors.redPrimaryColor};
    cursor: pointer;
  }
`;
