import { LoginGuard } from "@/router/guards/LoginGuard";
import { CategoryComponent } from "../AddCategory";
import { DishesComponent } from "../AddDishes";
import { EditCategoryComponent } from "../EditCategory";
import { EditDishesComponent } from "../EditDishe";

export const DishesRoutes = [
  {
    element: (
      <LoginGuard>
        <DishesComponent />
      </LoginGuard>
    ),
    path: "/dishes",
  },
  {
    element: (
      <LoginGuard>
        <DishesComponent />
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
        <CategoryComponent />
      </LoginGuard>
    ),
    path: "/category/:id",
  },
  {
    element: (
      <LoginGuard>
        <EditCategoryComponent />
      </LoginGuard>
    ),
    path: "/categories-edit",
  },
  {
    element: (
      <LoginGuard>
        <EditDishesComponent />
      </LoginGuard>
    ),
    path: "/dishes-edit",
  },
];
