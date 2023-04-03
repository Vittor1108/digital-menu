//STYLES
import { Header } from "./styles";
//Images
import mailImage from "../../assets/images/mail.png";
import bellImage from "../../assets/images/bell.png";
import placeholderUser from "../../assets/images/userPlaceholder.png";
//Interfaces
import { IHeader } from "./interfaces/IHeader";

export const HeaderComponent = (props: IHeader) => {
  return (
    <>
      <Header isOpen={props.isOpen}>
        <nav>
          <div className="iconMenu" onClick={() => props.openMenu()}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div>
            <ul>
              <li>
                <img src={mailImage} alt="Emails" className="mail" />
              </li>
              <li>
                <img src={bellImage} alt="Notificações" className="bell" />
              </li>
              <li>
                <img
                  src={placeholderUser}
                  alt="Notificações"
                  className="user"
                />
              </li>
            </ul>
          </div>
          <div className="iconMenuProfile">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </Header>
    </>
  );
};
