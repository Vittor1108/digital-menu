import {
  Button,
  Checkbox,
  Container,
  Input,
  Stack,
  CheckboxGroup,
} from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { TitleSection } from "@components/TitleSection";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetAllScreens } from "@hooks/useGetAllScreens";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useCreateEmployee } from "../hooks/useCreateEmployee";
import { useGetEmployee } from "../hooks/useGetEmployee";
import { IForm } from "./interfaces/IForm";
import { Form } from "./styled";
import { IEmployee } from "@services/api/employees/interfaces";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";

const schemaForm = yup.object({
  name: yup.string().required("Nome do prato é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrgiatório")
    .min(6)
    .required("Senha precisa de no minímo 6 caracteres"),
  acessScreens: yup
    .array()
    .of(yup.number().required("Selecione as telas de acesso")),
});

export const AddEmployeeComponent = (): JSX.Element => {
  const [title, setTitle] = React.useState<string>("Cadastar Funcionário");
  const [titleButton, setTitleButton] = React.useState<string>("Salvar");
  const [defaultScreens, setDefaultScreens] = React.useState<string[]>([]);
  const { fetchAllScreens } = useGetAllScreens();
  const { fetchGetEmployee } = useGetEmployee();
  const { requestCreateEmployee } = useCreateEmployee();
  const { fetchUpdateEmployee } = useUpdateEmployee();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    control,
    resetField,
  } = useForm<IForm>({
    resolver: yupResolver(schemaForm),
  });

  const onSubmit = (data: IForm): void => {
    if (!id) {
      requestCreateEmployee.mutate(data);
    } else {
      const params: IEmployee = {
        id: fetchGetEmployee.data?.data.id!,
        name: data.name,
        cpf: data.cpf,
        password: data.password,
        acessScreens: data.acessScreens,
      };

      fetchUpdateEmployee.mutate(params);
    }
  };

  const setDataForm = async (): Promise<void> => {
    const { data } = await fetchGetEmployee.mutateAsync(Number(id));
    setDefaultScreens(fetchAllScreens.data!.map((e) => `${e.id}`));
    setTitleButton("Atualizar");
    setTitle("Editar Funcionário");
    setValue("name", data.name);
    setValue("cpf", data.login!);
    setValue("password", data.password);
  };

  const resetForm = (): void => {
    reset({}, { keepDefaultValues: false, keepValues: false });
    setDefaultScreens([]);
  };

  React.useEffect(() => {
    if (id && fetchGetEmployee) {
      setDataForm();
    }
  }, [id]);

  React.useEffect(() => {
    if (!id) {
      resetForm();
    }
  }, []);

  return (
    <BaseLayout
      isLoading={[fetchAllScreens.isLoading, fetchGetEmployee.isLoading]}
    >
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
              {!id && (
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
              )}
              <Container maxW="100%" padding="0" marginBottom="15px">
                <label
                  htmlFor="screens"
                  style={{ width: "100%", marginBottom: "15px" }}
                >
                  Telas de acesso:{" "}
                </label>
                <CheckboxGroup defaultValue={defaultScreens}>
                  <Stack spacing={5} direction={"column"}>
                    {fetchAllScreens.data &&
                      fetchAllScreens.data!.map((screen) => {
                        return (
                          <Checkbox
                            colorScheme="red"
                            key={screen.id}
                            value={`${screen.id}`}
                            {...register("acessScreens")}
                          >
                            {screen.surname.charAt(0).toUpperCase() +
                              screen.surname.substring(1)}
                          </Checkbox>
                        );
                      })}
                  </Stack>
                </CheckboxGroup>
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
                  {titleButton}
                </Button>
              </Container>
            </article>
          </Container>
        </Form>
      </Container>
    </BaseLayout>
  );
};
