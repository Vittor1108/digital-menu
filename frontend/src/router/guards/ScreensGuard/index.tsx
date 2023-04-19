import { EScreens } from "@enums/EScreens";
import { useAcessScreen } from "@hooks/useAcessScreen";
import { useNavigate } from "react-router-dom";
import React from "react";
export const ScreensGuard = ({
  screen,
  children,
}: {
  screen: EScreens;
  children: JSX.Element;
}) => {
  const { acessScreen } = useAcessScreen();
  const navigate = useNavigate();

  if (!acessScreen(screen)) {
    React.useEffect(() =>{
        navigate("/");
    }, [])
  }
  return children;
};
