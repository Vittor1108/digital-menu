import { CategoryComponent } from "../AddCategory";
import { DishesComponent } from "../AddDishes";
import { EditCategoryComponent } from "../EditCategory";
import { EditDishesComponent } from "../EditDishe";

export const DishesRoutes = [
  {
    element: <DishesComponent />,
    path: "/dishes",
  },
  {
    element: <DishesComponent />,
    path: "/dishes/:id",
  },
  {
    element: <CategoryComponent />,
    path: "/category",
  },
  {
    element: <CategoryComponent />,
    path: "/category/:id",
  },
  {
    element: <EditCategoryComponent />,
    path: "/categories-edit",
  },
  {
    element: <EditDishesComponent />,
    path: "/dishes-edit",
  },
];
