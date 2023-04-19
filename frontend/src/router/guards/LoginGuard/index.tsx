import React from "react";
import { useNavigate } from "react-router-dom";
import { useValidationToken } from "@hooks/useValidateToken";

export const LoginGuard = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { validateToken } = useValidationToken();
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");

  if (!token) {
    React.useEffect(() => {
      navigate("/login");
    }, []);
  }

  if (token) {
    React.useEffect(() => {
      validateToken.mutate();
    }, []);
  }

  return children;
};
