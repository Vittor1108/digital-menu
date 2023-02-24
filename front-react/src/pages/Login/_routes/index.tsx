import { createBrowserRouter } from "react-router-dom";
import LoginComponent from "../Index";
import { LoginForm } from "../LoginForm/Index";

export const LoginRotues = [
  {
    element: <LoginComponent />,
    path: "/login",
    children: [
      {
        path: "",
        element: <LoginForm />,
      },
    ],
  },
];
