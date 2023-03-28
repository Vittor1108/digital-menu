import { Container, Input, Select, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { IDefaultTable } from "./interfaces";
import { Header, Main } from "./styled";
import { TriangleDownIcon } from "@chakra-ui/icons";


export const DefaulTable = ({ title }: IDefaultTable): JSX.Element => {
    return (
        <Container maxW="95%" backgroundColor="white" boxShadow="0 1px 6px 1px rgba(69,65,78,0.1)" padding="0">
            <Header>
                <h1>{title}</h1>
            </Header>
            <Container maxW="100%" padding="1.5rem" display="flex" alignItems="center" justifyContent="space-between">
                <Container w="auto" margin="0" display="flex" alignItems="center" padding="0">
                    <span>Mostar: </span>
                    <Select size="sm" marginLeft="10px">
                        <option value="">10</option>
                        <option value="">20</option>
                        <option value="">30</option>
                    </Select>
                </Container>
                <div>
                    <Input type="text" placeholder="Pesquisar Prato" size="sm" borderRadius="10px" />
                </div>
            </Container>
            <Main>
                <TableContainer>
                    <Table>
                        <Thead backgroundColor="red">
                            <Tr>
                                <Th color="white">ID</Th>
                                <Th color="white">Nome</Th>
                                <Th color="white" isNumeric>multiply by</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric>25.4</Td>
                            </Tr>
                            <Tr>
                                <Td>feet</Td>
                                <Td>centimetres (cm)</Td>
                                <Td isNumeric>30.48</Td>
                            </Tr>
                            <Tr>
                                <Td>yards</Td>
                                <Td>metres (m)</Td>
                                <Td isNumeric>0.91444</Td>
                            </Tr>
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>To convert</Th>
                                <Th>into</Th>
                                <Th isNumeric>multiply by</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Main>
        </Container>
    )
}