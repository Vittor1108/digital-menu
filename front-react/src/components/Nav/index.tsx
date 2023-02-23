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
//INTERFACES
import { INavigation } from "./interfaces/INavigation";

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
              <p>Menus</p>
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
                <a href="">Adicionar Categorias</a>
              </li>
              <li>
                <a href="">Editar Categorias</a>
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
              <p>Pedidos</p>
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
