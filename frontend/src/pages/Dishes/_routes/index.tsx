import { LoginGuard } from "@/router/guards/LoginGuard";
import { ScreensGuard } from "@/router/guards/ScreensGuard";
import { CategoryComponent } from "../AddCategory";
import { DishesComponent } from "../AddDishes";
import { EditCategoryComponent } from "../EditCategory";
import { EditDishesComponent } from "../EditDishe";
import { EScreens } from "@enums/EScreens";

export const DishesRoutes = [
  {
    element: (
      <LoginGuard>
        <ScreensGuard screen={EScreens.PRODUCTS}>
          <DishesComponent />
        </ScreensGuard>
      </LoginGuard>
    ),
    path: "/dishes",
  },
  {
    element: (
      <LoginGuard>
        <ScreensGuard screen={EScreens.PRODUCTS}>
          <DishesComponent />
        </ScreensGuard>
      </LoginGuard>
    ),
    path: "/dishes/:id",
  },
  {
    element: (
      <LoginGuard>
        <CategoryComponent />
      </LoginGuard>
    ),
    path: "/category",
  },
  {
    element: (
      <LoginGuard>
        <ScreensGuard screen={EScreens.PRODUCTS}>
          <CategoryComponent />
        </ScreensGuard>
      </LoginGuard>
    ),
    path: "/category/:id",
  },
  {
    element: (
      <LoginGuard>
        <ScreensGuard screen={EScreens.PRODUCTS}>
          <EditCategoryComponent />
        </ScreensGuard>
      </LoginGuard>
    ),
    path: "/categories-edit",
  },
  {
    element: (
      <LoginGuard>
        <ScreensGuard screen={EScreens.PRODUCTS}>
          <EditDishesComponent />
        </ScreensGuard>
      </LoginGuard>
    ),
    path: "/dishes-edit",
  },
];
