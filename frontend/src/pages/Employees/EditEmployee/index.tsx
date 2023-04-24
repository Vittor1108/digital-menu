import { Container } from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { DefaulTable } from "@components/DefaultTable";
import { useGetAllRequests } from "@hooks/useGetAllRequests";
import { IEmployee } from "@services/api/employees/interfaces";
import { useGetAllEmployees } from "../hooks/useGetAlEmployees";

const columns = [
  {
    key: "id",
    header: "Id",
    render: (employee: IEmployee) => <>{employee.id}</>,
  },
  {
    key: "name",
    header: "Nome",
    render: (employee: IEmployee) => <>{employee.name}</>,
  },
];

export const EditEmployeeComponent = (): JSX.Element => {
  const {fetchGetAllEmployees} = useGetAllEmployees();

  return (
    <BaseLayout isLoading={[false]}>
      <Container maxW="100%" padding="0" maxH="100%">
        <DefaulTable<IEmployee>
        data={fetchGetAllEmployees.isLoading ? [] : fetchGetAllEmployees!.data!}
        columns={columns}
        title="Lista de Categorias"
        keyImage="ProductPhoto"
        deleteAction={(id: number) => {}}
        editAction="/dishes/"
        changeDataGet={() => {}}
        quantityData={19}
        />
      </Container>
    </BaseLayout>
  );
};
