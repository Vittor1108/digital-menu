import { CategoryComponent } from "../AddCategory";
import { DishesComponent } from "../AddDishes";
import { EditCategoryComponent } from "../EditCategory";

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
  {
    element: <EditCategoryComponent />,
    path: "/category/edit",
  }
];
