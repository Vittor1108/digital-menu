import { BaseLayout } from "@components/BaseLayout";
import { Container } from "@chakra-ui/react";
import { DefaulTable } from "@components/DefaultTable";
import { ICategorie } from "@interfaces/ICategorie";
import { useGetllDishes } from "@hooks/useGetAllDishes";
import { IDishes } from "@interfaces/IDishes";

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

export const EditDishesComponent = (): JSX.Element => {
  const { dataFecthDishes, dishesIsLoading } = useGetllDishes();

  return (
    <BaseLayout isLoading={[dishesIsLoading]}>
      <Container maxW="100%" padding="0">
        <DefaulTable<IDishes>
          data={dataFecthDishes!}
          columns={columns}
          title="Lista de Categorias"
          keyImage="ProductPhoto"
          deleteAction={(id: number) => {}}
          editAction="/product/"
        />
      </Container>
    </BaseLayout>
  );
};
