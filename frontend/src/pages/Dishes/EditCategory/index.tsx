import { BaseLayout } from "@components/BaseLayout";
import { Container } from "@chakra-ui/react";
import { DefaulTable } from "@components/DefaultTable";
import { ICategorie } from "@interfaces/ICategorie";
import { useGetAllCategories } from "@hooks/useGetAllCategories";
import { CategorieService } from "@services/api/categories";

const columns = [
  {
    key: "id",
    header: "Id",
    render: (category: ICategorie) => <>{category.id}</>,
  },
  {
    key: "name",
    header: "Nome",
    render: (category: ICategorie) => <>{category.name}</>,
  },
];

export const EditCategoryComponent = (): JSX.Element => {
  const { categoriesIsLoading, dataFetchCategories } = useGetAllCategories();

  return (
    <BaseLayout isLoading={[categoriesIsLoading]}>
      <Container maxW="100%" padding="0">
        <DefaulTable<ICategorie>
          data={dataFetchCategories!}
          columns={columns}
          title="Lista de Categorias"
          keyImage="PhotoCategory"
          deleteAction={(id: number) => deleteCategory(id)}
          editAction="/category/"
        />
      </Container>
    </BaseLayout>
  );
};
