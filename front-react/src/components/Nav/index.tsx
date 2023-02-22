import React from "react";
//Images
import imgSystem from "../../assets/images/imgSystem.png";
//Components Styled
import { NavigationMenu } from "./styles";
//ICONS
import { RiDashboardFill } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaArchive } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { BsFillBasket2Fill } from "react-icons/bs";

export const Navigation = () => {
  return (
    <>
      <NavigationMenu>
        <ul>
          <li>
            <img src={imgSystem} alt="Costic Food" />
          </li>
          <li>
            <div>
              <RiDashboardFill />
              <p>Dashboard</p>
            </div>
          </li>
          <li className="treeMenu">
            <div>
              <FaArchive />
              <p>Menus</p>
            </div>
            <RiArrowDownSLine />
            <ul>
              <li>ok</li>
            </ul>
          </li>
          <li className="treeMenu">
            <div>
              <BsFillBasket2Fill />
              <p>Ingredientes</p>
            </div>
            <RiArrowDownSLine />
          </li>
          <li>
            <div>
              <FaClipboardList />
              <p>Pedidos</p>
            </div>
          </li>
          <li className="treeMenu">
            <div>
              <FaUserFriends />
              <p>Funcionários</p>
            </div>
            <RiArrowDownSLine />
          </li>
          <li>
            <div>
              <FaBriefcase />
              <p>Vendas</p>
            </div>
          </li>
        </ul>
      </NavigationMenu>
    </>
  );
};
