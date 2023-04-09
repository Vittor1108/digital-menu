import { Container } from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { DefaulTable } from "@components/DefaultTable";
import { useGetllDishes } from "@hooks/useGetAllDishes";
import { IDishes } from "@interfaces/IDishes";
import { IPagination } from "@interfaces/IPagination";
import React from "react";
import { useDeleteDishe } from "./hooks/useDeleteDishe";

const genAvaragePrice = (price: number | undefined): string => {
  return price
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price)
    : "NA";
};

const columns = [
  {
    key: "id",
    header: "Id",
    render: (dishe: IDishes) => <>{dishe.id}</>,
  },
  {
    key: "name",
    header: "Nome",
    render: (dishe: IDishes) => <>{dishe.name}</>,
  },
  {
    key: "price",
    header: "Preço",
    render: (dishe: IDishes) => <>{genAvaragePrice(dishe.price)}</>,
  },
  {
    key: "avargePrice",
    header: "Preço Médio",
    render: (dishe: IDishes) => <>{genAvaragePrice(dishe.avargePrice)}</>,
  },
];

export const EditDishesComponent = (): JSX.Element => {
  const [dataGet, setDataGet] = React.useState<IPagination>({
    skip: 0,
    take: 10,
    text: "",
  });

  const { dataFecthDishes, dishesIsLoading, dishesRefetch } =
    useGetllDishes(dataGet);
  const { deleteDishe } = useDeleteDishe();

  React.useEffect(() => {
    dishesRefetch();
  }, [dataGet]);

  return (
    <BaseLayout isLoading={[dishesIsLoading]}>
      <Container maxW="100%" padding="0"  maxH="100%">
        <DefaulTable<IDishes>
          data={dishesIsLoading ? [] : dataFecthDishes!.dishes}
          columns={columns}
          title="Lista de Categorias"
          keyImage="ProductPhoto"
          deleteAction={(id: number) => {
            deleteDishe.mutate(id);
          }}
          editAction="/dishes/"
          changeDataGet={setDataGet}
          quantityData={dataFecthDishes?.quantity}
        />
      </Container>
    </BaseLayout>
  );
};
