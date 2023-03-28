import { CategoryComponent } from "../AddCategory";
import { DishesComponent } from "../AddDishes";

export const DishesRoutes = [
  {
    element: <DishesComponent />,
    path: "/dishes",
  },
  {
    element: <DishesComponent />,
    path: "/dishes/:id"
  },
  {
    element: <CategoryComponent />,
    path: "/category"
  },
  {
    element: <CategoryComponent />,
    path: "/category/:id",
  },
];
