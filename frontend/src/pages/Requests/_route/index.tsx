import { RequestComponent } from "..";
import { LoginGuard } from "@/router/guards/LoginGuard";
import { ScreensGuard } from "@/router/guards/ScreensGuard";
import { EScreens } from "@enums/EScreens";
export const RequestsRoutes = [
  {
    element: (
      <LoginGuard>
        <ScreensGuard screen={EScreens.REQUESTS}>
          <RequestComponent />
        </ScreensGuard>
      </LoginGuard>
    ),
    path: "/requests",
  },
];
