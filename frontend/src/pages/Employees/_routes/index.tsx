import { AddEmployeeComponent } from "../AddEmployee";
import { LoginGuard } from "@/router/guards/LoginGuard";
import { ScreensGuard } from "@/router/guards/ScreensGuard";
import { EScreens } from "@enums/EScreens";
import { EditEmployeeComponent } from "../EditEmployee";
export const EmployeesRoutes = [
  {
    element: (
      <LoginGuard>
        <ScreensGuard screen={EScreens.EMPLOYEES}>
          <AddEmployeeComponent />
        </ScreensGuard>
      </LoginGuard>
    ),
    path: "/employee",
  },
  {
    element: (
      <LoginGuard>
        <ScreensGuard screen={EScreens.EMPLOYEES}>
          <EditEmployeeComponent />
        </ScreensGuard>
      </LoginGuard>
    ),
    path: "/edit-employee",
  }
];
