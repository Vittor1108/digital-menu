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
import { IPagination } from "@interfaces/IPagination";
import { IPhoto } from "@interfaces/IPhoto";
import React from "react";
import { TableProps } from "./interfaces";
import {
  Button,
  Header,
  Image,
  Link,
  Main,
  Pagination,
  ItemPagination,
} from "./styled";

const calcQtdPagination = (qtdData: number, take: number) => {
  return Math.ceil(qtdData / take);
};

export const DefaulTable = <T,>({
  title,
  data,
  columns,
  keyImage,
  deleteAction,
  editAction,
  changeDataGet,
  quantityData,
}: TableProps<T>): JSX.Element => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [idCategory, setIdCategory] = React.useState<number | null>(null);
  const [page, setPage] = React.useState<number>(1);
  const [dataGet, setDataGet] = React.useState<IPagination>({
    skip: 0,
    take: 10,
    text: "",
  });
  
  const handleClickPagination = (e: any) => {
    const numberPagination = Number(e.target.innerHTML);
    if (numberPagination > page) {
      setPage(page + 1);
      setDataGet({
        skip: dataGet.take,
        text: dataGet.text,
        take: dataGet.take,
      });
    }

    if (numberPagination < page) {
      setPage(page - 1);
      setDataGet({
        skip: dataGet.take - dataGet.take,
        text: dataGet.text,
        take: dataGet.take,
      });
    }
  };

  React.useEffect(() => {
    if (quantityData) {
      calcQtdPagination(quantityData, dataGet.take);
    }
    changeDataGet(dataGet);
  }, [dataGet]);

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
          <Select
            size="sm"
            marginLeft="10px"
            onChange={(e) => {
              setDataGet({
                skip: dataGet.skip,
                take: Number(e.currentTarget.value),
                text: dataGet.text,
              });
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </Select>
        </Container>
        <div>
          <Input
            type="text"
            placeholder="Pesquisar..."
            size="sm"
            borderRadius="10px"
            onChange={(e) => {
              setDataGet({
                skip: dataGet.skip,
                take: dataGet.take,
                text: e.target.value,
              });
            }}
          />
        </div>
      </Container>
      <Main>
        <Container maxW="100%" padding="0" fontSize="14px" marginBottom="10px">
          <p>
            Exibindo {data.length} de {quantityData}
          </p>
        </Container>
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
          <Container maxW="100%" marginTop="20px">
            {!dataGet.text && (
              <Pagination>
                <ul>
                  {Array.from(
                    Array(calcQtdPagination(quantityData!, dataGet.take)),
                    (element, index: number) => {
                      return (
                        <ItemPagination
                          key={index}
                          isActive={page === index + 1}
                          onClick={(e) => handleClickPagination(e)}
                        >
                          {index + 1}
                        </ItemPagination>
                      );
                    }
                  )}
                </ul>
              </Pagination>
            )}
          </Container>
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
