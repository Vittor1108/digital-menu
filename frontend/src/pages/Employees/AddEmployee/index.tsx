import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Input,
  Stack,
} from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { TitleSection } from "@components/TitleSection";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetAllScreens } from "@hooks/useGetAllScreens";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IForm } from "./interfaces/IForm";
import { Form } from "./styled";
import { useCreateEmployee } from "../hooks/useCreateEmployee";

const schemaForm = yup.object({
  name: yup.string().required("Nome do prato é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  password: yup.string().required("Senha é obrgiatório"),
  acessScreens: yup
    .array()
    .of(yup.number().required("Selecione as telas de acesso")),
});

export const AddEmployeeComponent = (): JSX.Element => {
  const [title, setTitle] = React.useState<string>("Cadastar Funcionário");
  const { fetchAllScreens } = useGetAllScreens();
  const { requestCreateEmployee } = useCreateEmployee();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<IForm>({
    resolver: yupResolver(schemaForm),
  });

  const onSubmit = (data: IForm): void => {
    requestCreateEmployee.mutate(data);
  };

  return (
    <BaseLayout isLoading={[false]}>
      <Container maxW="100%">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container backgroundColor="white" width="70%" maxW="700px">
            <TitleSection>{title}</TitleSection>
            <article>
              <Container
                maxW="100%"
                padding="0"
                marginBottom="15px"
                marginTop="15px"
              >
                <label htmlFor="name">Nome do funcionário:</label>
                <Input
                  placeholder="Nome"
                  size="sm"
                  type="text"
                  id="name"
                  {...register("name")}
                />
              </Container>
              <Container maxW="100%" padding="0" marginBottom="15px">
                <label htmlFor="cpf">CPF do funcionário: </label>
                <Input
                  placeholder="000.000.000-00"
                  size="sm"
                  type="text"
                  id="cpf"
                  {...register("cpf")}
                />
              </Container>
              <Container maxW="100%" padding="0" marginBottom="15px">
                <label htmlFor="password">Senha do funcionário: </label>
                <Input
                  placeholder="Senha"
                  size="sm"
                  type="password"
                  id="password"
                  {...register("password")}
                />
              </Container>
              <Container maxW="100%" padding="0" marginBottom="15px">
                <label
                  htmlFor="screens"
                  style={{ width: "100%", marginBottom: "15px" }}
                >
                  Telas de acesso:{" "}
                </label>
                <Stack spacing={5} direction={"column"}>
                  {fetchAllScreens.data &&
                    fetchAllScreens.data!.map((screen) => {
                      return (
                        <Checkbox
                          colorScheme="red"
                          key={screen.id}
                          value={screen.id}
                          {...register("acessScreens")}
                        >
                          {screen.surname.charAt(0).toUpperCase() +
                            screen.surname.substring(1)}
                        </Checkbox>
                      );
                    })}
                </Stack>
              </Container>
              <Container maxW="100%" marginTop="28px" marginBottom="28px">
                <Button
                  fontWeight="normal"
                  fontSize="14px"
                  borderRadius="0 3px 3px 0"
                  height="32px"
                  backgroundColor="red"
                  color="white"
                  width="100%"
                  type="submit"
                >
                  Salvar
                </Button>
              </Container>
            </article>
          </Container>
        </Form>
      </Container>
    </BaseLayout>
  );
};
