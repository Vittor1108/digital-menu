import React from "react";
import { Header } from "./styles";

//Images
import mailImage from "../../assets/images/mail.png";
import bellImage from "../../assets/images/bell.png";
import placeholderUser from "../../assets/images/userPlaceholder.png";

export const HeaderComponent = () => {
  const changeMenu = (): void => {
    console.log("OK");
  };

  return (
    <>
      <Header>
        <nav>
          <div className="iconMenu" onClick={() => changeMenu()}>
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
        </nav>
      </Header>
    </>
  );
};
