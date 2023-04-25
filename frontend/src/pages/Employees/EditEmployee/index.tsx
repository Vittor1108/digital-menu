import { Container } from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { DefaulTable } from "@components/DefaultTable";
import { IEmployee } from "@services/api/employees/interfaces";
import { useGetAllEmployees } from "../hooks/useGetAlEmployees";
import React from "react";
import { IPagination } from "@interfaces/IPagination";
import { useDeleteEmployee } from "../hooks/useDeleteEmployee";

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
  {
    key: "login",
    header: "Login",
    render: (employee: IEmployee) => <>{employee.login}</>,
  },
];

export const EditEmployeeComponent = (): JSX.Element => {
  const [dataGet, setDataGet] = React.useState<IPagination>({
    skip: 0,
    take: 10,
    text: "",
  });
  const { fetchGetAllEmployees } = useGetAllEmployees(dataGet);
  const { fetchDeleteEmployee } = useDeleteEmployee();

  React.useEffect(() => {
    console.log(fetchGetAllEmployees.data);
  }, []);

  return (
    <BaseLayout isLoading={[fetchGetAllEmployees.isLoading]}>
      <Container maxW="100%" padding="0" maxH="100%">
        <DefaulTable<IEmployee>
          data={
            fetchGetAllEmployees.isLoading
              ? []
              : fetchGetAllEmployees.data!.employees
          }
          columns={columns}
          title="Lista de Funcionários"
          keyImage="ProductPhoto"
          deleteAction={(id: number) => {
            fetchDeleteEmployee.mutate(id);
          }}
          editAction="/employee/"
          changeDataGet={setDataGet}
          quantityData={1}
        />
      </Container>
    </BaseLayout>
  );
};
