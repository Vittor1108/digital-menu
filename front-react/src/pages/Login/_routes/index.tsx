import { createBrowserRouter } from "react-router-dom";
import { CreateAccountForm } from "../CreateAccountForm";
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
      {
        path: "create-account",
        element: <CreateAccountForm />,
      },
    ],
  },
];
