import { BsFillBasket2Fill } from "react-icons/bs";
import {
  FaArchive,
  FaBriefcase,
  FaClipboardList,
  FaUserFriends,
} from "react-icons/fa";
import { RiArrowDownSLine, RiDashboardFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import imgSystem from "../../assets/images/imgSystem.png";
import { INavigation } from "./interfaces/INavigation";
import { NavigationMenu } from "./styles";

export const Navigation = (props: INavigation) => {
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

  return (
    <>
      <NavigationMenu openMenu={props.isOpen}>
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
          <li className="treeMenu" onClick={() => showAccordion(0)}>
            <div>
              <FaArchive />
              <p>Produtos</p>
            </div>
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
          </li>
          <li className="treeMenu" onClick={() => showAccordion(1)}>
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
          </li>
          <li>
            <div>
              <FaClipboardList />
              <Link to="/requests">
                <p>Pedidos</p>
              </Link>
            </div>
          </li>
          <li className="treeMenu" onClick={() => showAccordion(2)}>
            <div>
              <FaUserFriends />
              <p>Funcionários</p>
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
