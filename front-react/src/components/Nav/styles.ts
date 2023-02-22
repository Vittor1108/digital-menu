import styled from "styled-components";
//COLORS
import { colors } from "../../config/colors";

export const NavigationMenu = styled.nav`
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);

  ul {
    li {
      padding: 15px 0 15px 25px;
      font-size: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      &:nth-child(1) {
        text-align: center;
        background-color: ${colors.graySecondary};
        display: block;
        border: none;
        padding: 0;
        img {
          max-width: 150px;
          padding: 9px 0;
        }
      }

      > div {
        display: flex;
        align-items: center;

        p {
          margin-left: 10px;
        }
      }

      > svg {
        margin-right: 10px;
      }

      &:hover {
        color: red;
        transition: all 0.3s;
        cursor: pointer;
      }
    }

    .treeMenu {
      border: 1px solid red;
      flex-wrap: wrap;
      ul {
        width: 100%;
        &:nth-child(1) {
          background-color: none;
        }
      }
    }
  }
`;
