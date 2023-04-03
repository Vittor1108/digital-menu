import {
  Container,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { IPhoto } from "@interfaces/IPhoto";
import { TableProps } from "./interfaces";
import { Button, Header, Main } from "./styled";
import { Image, Link } from "./styled";


export const DefaulTable = <T,>({
  title,
  data,
  columns,
  keyImage,
  deleteAction,
  editAction,
}: TableProps<T>): JSX.Element => {
  return (
    <Container
      maxW="95%"
      backgroundColor="white"
      boxShadow="0 1px 6px 1px rgba(69,65,78,0.1)"
      padding="0"
    >
      <Header>
        <h1>{title}</h1>
      </Header>
      <Container
        maxW="100%"
        padding="1.5rem"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Container
          w="auto"
          margin="0"
          display="flex"
          alignItems="center"
          padding="0"
        >
          <span>Mostar: </span>
          <Select size="sm" marginLeft="10px">
            <option value="">10</option>
            <option value="">20</option>
            <option value="">30</option>
          </Select>
        </Container>
        <div>
          <Input
            type="text"
            placeholder="Pesquisar Prato"
            size="sm"
            borderRadius="10px"
          />
        </div>
      </Container>
      <Main>
        <TableContainer>
          <Table verticalAlign="middle">
            <Thead backgroundColor="red">
              <Tr>
                {columns.map((column) => {
                  return (
                    <Th textAlign="center" color="white" key={column.key}>
                      {column.header}
                    </Th>
                  );
                })}
                <Th textAlign="center" color="white">
                  Ações
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => {
                return (
                  <Tr key={index}>
                    {columns.map((column) => {
                      const objectImage =
                        data[index][keyImage as keyof typeof data[0]];
                      const { url } = objectImage[
                        0 as keyof typeof objectImage
                      ] as IPhoto;

                      if (column.key === "name") {
                        return (
                          <Td
                            key={column.key}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            marginTop="10px"
                          >
                            <Image src={url} />
                            {column.render(item)}
                          </Td>
                        );
                      }
                      return (
                        <Td textAlign="center" key={column.key}>
                          {column.render(item)}
                        </Td>
                      );
                    })}
                    <Td textAlign="center">
                      <Link
                        to={
                          editAction + data[index]["id" as keyof typeof data[0]]
                        }
                      >
                        Editar
                      </Link>

                      <Button backgroundColor="red" onClick={() => deleteAction()}>Excluir</Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Main>
    </Container>
  );
};
