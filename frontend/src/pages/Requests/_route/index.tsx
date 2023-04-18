import { RequestComponent } from "..";
import { LoginGuard } from "@/router/guards/LoginGuard";
export const RequestsRoutes = [
  {
    element: (
      <LoginGuard>
        <RequestComponent />
      </LoginGuard>
    ),
    path: "/requests",
  },
];
