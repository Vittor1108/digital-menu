import { Container } from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { DefaulTable } from "@components/DefaultTable";
import { useGetAllCategories } from "@hooks/useGetAllCategories";
import { ICategorie } from "@interfaces/ICategorie";
import { useDeleteCategory } from "./hooks/useDeleteCategory";
import React from "react";
import { IPagination } from "@interfaces/IPagination";

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
  const [dataGet, setDataGet] = React.useState<IPagination>({
    skip: 0,
    take: 10,
    text: "",
  });

  const { categoriesIsLoading, dataFetchCategories } =
    useGetAllCategories(dataGet);
  const { deleteCategory } = useDeleteCategory();

  return (
    <BaseLayout isLoading={[categoriesIsLoading]}>
      <Container maxW="100%" padding="0">
        <DefaulTable<ICategorie>
          data={categoriesIsLoading ? [] : dataFetchCategories!.categories}
          columns={columns}
          title="Lista de Categorias"
          keyImage="PhotoCategory"
          deleteAction={(id: number) => {
            deleteCategory.mutate(id);
          }}
          editAction="/category/"
          changeDataGet={setDataGet}
          quantityData={dataFetchCategories?.quantity}
        />
      </Container>
    </BaseLayout>
  );
};
