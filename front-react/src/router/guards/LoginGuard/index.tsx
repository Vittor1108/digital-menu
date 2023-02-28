import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const LoginGuard = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");
  if (!token) {
    useEffect(() => {
      navigate("/login");
    }, []);
  }
  return children;
};
