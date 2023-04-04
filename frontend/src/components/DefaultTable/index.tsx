import AlertImage from "@assets/images/modal/alert.png";
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
import { GenericModal } from "@components/GenericModal";
import { IPhoto } from "@interfaces/IPhoto";
import React from "react";
import { TableProps } from "./interfaces";
import { Button, Header, Image, Link, Main } from "./styled";

export const DefaulTable = <T,>({
  title,
  data,
  columns,
  keyImage,
  deleteAction,
  editAction,
}: TableProps<T>): JSX.Element => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [idCategory, setIdCategory] = React.useState<number | null>(null);
  console.log(data);
  if (!data.length) {
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
              placeholder="Pesquisar..."
              size="sm"
              borderRadius="10px"
            />
          </div>
        </Container>
        <h1
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
            padding: "10px 0",
            textTransform: "uppercase",
          }}
        >
          Não há dados para a tabela
        </h1>
      </Container>
    );
  }

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
            placeholder="Pesquisar..."
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
                const id = data[index]["id" as keyof typeof data[0]];
                return (
                  <Tr key={index}>
                    {columns.map((column) => {
                      let objectImage;
                      let objectFiles;
                      let url;
                      if (data[0][keyImage as keyof typeof data[0]]) {
                        objectImage =
                          data[index][keyImage as keyof typeof data[0]];
                          objectFiles = objectImage[
                          0 as keyof typeof objectImage
                        ] as IPhoto;
                        
                        url = objectFiles.url ? objectFiles.url : "";
                      }

                      if (column.key === "name") {
                        return (
                          <Td
                            key={column.key}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            marginTop="10px"
                          >
                            {url && <Image src={url!} />}
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
                      <Link to={editAction + id}>Editar</Link>

                      <Button
                        backgroundColor="red"
                        onClick={() => {
                          setModalOpen(true);
                          setIdCategory(Number(id));
                        }}
                      >
                        Excluir
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Main>
      {modalOpen && (
        <GenericModal
          imagePath={AlertImage}
          subTitle="Por favor confirme se deseja excluir"
          title="Deseja excluir a categoria?"
          articleWidth="400px"
          isOpen={modalOpen}
          textConfirmButton="Excluir"
          textDenayButton="Voltar"
          buttonColorDenay="black"
          clickFunction={(result: boolean) => {
            !result ? deleteAction(idCategory) : false;
            setModalOpen(false);
          }}
        ></GenericModal>
      )}
    </Container>
  );
};
