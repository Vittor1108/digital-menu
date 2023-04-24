import { EScreens } from "@enums/EScreens";
import { useAcessScreen } from "@hooks/useAcessScreen";
import { BsFillBasket2Fill } from "react-icons/bs";
import {
  FaArchive,
  FaBriefcase,
  FaClipboardList,
  FaHome,
  FaUserFriends,
} from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import imgSystem from "../../assets/images/imgSystem.png";
import { INavigation } from "./interfaces/INavigation";
import { NavigationMenu, ItemList } from "./styles";
import React from "react";

export const Navigation = (props: INavigation) => {
  const { acessScreen } = useAcessScreen();
  const location = useLocation();
  const showAccordion = (numberAccordion: number): void => {
    const treeMenu = document.querySelectorAll(".treeMenu > ul");

    if (treeMenu[numberAccordion].classList.contains("show")) {
      treeMenu[numberAccordion].classList.remove("show");
      return;
    }

    treeMenu.forEach((e) => {
      e.classList.remove("show");
    });

    treeMenu[numberAccordion].classList.add("show");
  };

  const verifyRoute = (routeName: string): boolean => {
    const path = location.pathname.replace("/", "");
    return path.includes(routeName) ? true : false;
  };

  React.useEffect(() => {
    verifyRoute("");
  }, []);

  return (
    <>
      <NavigationMenu openMenu={props.isOpen}>
        <ul>
          <ItemList route={verifyRoute("/")}>
            <img src={imgSystem} alt="Costic Food" />
          </ItemList>
          <ItemList route={location.pathname === "/"}>
            <div>
              <FaHome />
              <Link to="/">
                <p>Home</p>
              </Link>
            </div>
          </ItemList>
          {acessScreen(EScreens.PRODUCTS.toLocaleLowerCase()) && (
            <ItemList
              className="treeMenu"
              onClick={() => showAccordion(0)}
              route={verifyRoute("dishes")}
            >
              <div>
                <FaArchive />
                <p>Produtos</p>
              </div>{" "}
              <RiArrowDownSLine />
              <ul>
                <li>
                  <Link to="/dishes">Adicionar Prato</Link>
                </li>
                <li>
                  <Link to="/dishes-edit">Editar Pratos</Link>
                </li>
                <li>
                  <Link to="/category">Adicionar Categoria</Link>
                </li>
                <li>
                  <Link to="/categories-edit">Editar Categorias</Link>
                </li>
              </ul>
            </ItemList>
          )}
          {acessScreen(EScreens.INGREDIENTS.toLocaleLowerCase()) && (
            <ItemList
              className="treeMenu"
              onClick={() => showAccordion(1)}
              route={verifyRoute("/z")}
            >
              <div>
                <BsFillBasket2Fill />
                <p>Ingredientes</p>
              </div>
              <RiArrowDownSLine />
              <ul>
                <li>
                  <a href="">Adicionar Prdouto</a>
                </li>
                <li>
                  <a href="">Editar Prdouto</a>
                </li>
                <li>
                  <a href="">Adicionar Categoria</a>
                </li>
                <li>
                  <a href="">Editar Categoria</a>
                </li>
              </ul>
            </ItemList>
          )}
          {acessScreen(EScreens.REQUESTS.toLocaleLowerCase()) && (
            <ItemList route={verifyRoute("requests")}>
              <div>
                <FaClipboardList />
                <Link to="/requests">
                  <p>Pedidos</p>
                </Link>
              </div>
            </ItemList>
          )}
          {acessScreen(EScreens.EMPLOYEES.toLocaleLowerCase()) && (
            <ItemList
              className="treeMenu"
              onClick={() => showAccordion(2)}
              route={verifyRoute("employee")}
            >
              <div>
                <FaUserFriends />
                <p>Funcionários</p>
              </div>
              <RiArrowDownSLine />
              <ul>
                <li>
                  <Link to="/employee">Cadastar Funcionário</Link>
                </li>
                <li>
                  <Link to="/edit-employee">Editar Funcionário</Link>
                </li>
              </ul>
            </ItemList>
          )}
          {acessScreen(EScreens.SEELS.toLocaleLowerCase()) && (
            <ItemList route={verifyRoute("/a")}>
              <div>
                <FaBriefcase />
                <p>Vendas</p>
              </div>
            </ItemList>
          )}
        </ul>
      </NavigationMenu>
    </>
  );
};
