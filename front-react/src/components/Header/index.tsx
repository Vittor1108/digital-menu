import React from "react";
import { Header } from "./styles";

//Images
import mailImage from "../../assets/images/mail.png";
import bellImage from "../../assets/images/bell.png";
import placeholderUser from "../../assets/images/userPlaceholder.png";

export const HeaderComponent = (props: any) => {
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
