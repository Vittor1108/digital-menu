import React from "react";
import { useNavigate } from "react-router-dom";
import { useInfoUser } from "@hooks/useinfoUser";

export const LoginGuard = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { infoUser } = useInfoUser();
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");

  if (!token) {
    React.useEffect(() => {
      navigate("/login");
    }, []);
  }

  if (token) {
    React.useEffect(() => {
      infoUser.mutate();
    }, []);
  }

  return children;
};
