import { CategorieService } from "@services/api/categories";
import { useMutation } from "react-query";

const useDeleteCategory = () => {
  const deleteCategory = useMutation(
    (id: number) => CategorieService.deleteCategory(id),
    {
      onSuccess: () => {},

      onError: () => {},
    }
  );

  return {
    useDeleteCategory,
  };
};
