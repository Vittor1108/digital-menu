import { CreateAccountForm } from "../CreateAccountForm";
import LoginComponent from "../Index";
import { LoginForm } from "../LoginForm/Index";
import { ResetPassword } from "../ResetPassword";

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
      {
        path: "reset-password",
        element: <ResetPassword />,
      }
    ],
  },
];
