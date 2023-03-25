import { Button, Container, Input, Textarea } from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { CardSection } from "@components/CardSection";
import { ImagesCarrosel } from "@components/ImagesCarrosel";
import { TitleSection } from "@components/TitleSection";
import { yupResolver } from "@hookform/resolvers/yup";
import { IOptionType } from "@interfaces/IOption";
import { currencyFormat } from "@utils/functions/currencyFormat";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import * as yup from "yup";
import { useCreateDishe } from "./hooks/useCreateDishe";
import { useGetAllCategories } from "./hooks/useGetAllCategories";
import { IForm } from "./interfaces/IForm";
import { Form } from "./styled";
import { useThumbImages } from "@hooks/useThumbImages";
import { IPhoto } from "@interfaces/IPhoto";

const schemaForm = yup.object({
  name: yup.string().required("Nome do prato é obrigatório"),
  description: yup.string().required("Descrição do prato é obrigatória"),
  categoriesId: yup.array().required("Categoria é obrigatória"),
  price: yup.string().required("Preço é obrigatório"),
});


export const DishesComponent = (): JSX.Element => {
  const [placeHolderFiles, setPlaceholderFiles] = React.useState<string>("Nenhuma Foto");
  const [thumbImages, setThumbImages] = React.useState<string[]>([]);
  const [files, setFiles] = React.useState<FileList | null | IPhoto[]>(null);
  const [categories, setCategories] = React.useState<IOptionType[]>([]);
  const { dataFetchCategories, categoriesIsLoading } = useGetAllCategories();
  const [urlImages, genFiles, genPlaceholder] = useThumbImages();
  const { fetchCreateDishe } = useCreateDishe();
  const refInput = React.useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(schemaForm),
  });

  const onSubmit = (data: IForm): void => {
    createDishe(data);
  }


  const createDishe = ({ name, categoriesId, price, description }: IForm) => {
    const params = {
      name,
      price: Number(currencyFormat(price)),
      categoriesId,
      description
    }
    fetchCreateDishe.mutate(params);
  }


  const eventImages = (fileList: FileList | null | IPhoto[]): void => {
    setPlaceholderFiles(genPlaceholder(fileList));
    setThumbImages(urlImages(fileList));
    setFiles(genFiles(fileList));
  }




  React.useEffect(() => {
    if (dataFetchCategories) {
      const categories: IOptionType[] = dataFetchCategories.map(category => {
        return {
          value: category.id!,
          label: category.name,
        }
      });
      setCategories(categories);
    }
  }, [dataFetchCategories, categoriesIsLoading])

  return (
    <BaseLayout isLoading={[categoriesIsLoading]}>
      <Container
        maxW="100%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          "@media screen and (max-width: 1199px)": {
            display: "block",
          },
        }}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CardSection>
            <TitleSection>Adicionar Prato</TitleSection>
            <article>
              <div>
                <label htmlFor="dishes">Nome do prato</label>
                <Input
                  placeholder="Lasanha de 4 queijos"
                  size="sm"
                  type="text"
                  id="dishes"
                  {...register("name")}
                />
              </div>
              <Container
                maxW="100%"
                padding="0"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                margin="15px auto"
                sx={{
                  "@media screen and (max-width: 1199px)": {
                    display: "block",
                  },
                }}
              >
                <Container maxW="100%" padding="0" flex="1">
                  <label htmlFor="category">Seleciona a categoria</label>
                  <Controller
                    control={control}
                    name="categoriesId"
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                    }) => (
                      <Select
                        options={categories as any}
                        isLoading={categoriesIsLoading}
                        isMulti={true}
                        onBlur={onBlur}
                        onChange={(selectedOption) => {
                          onChange(selectedOption.map((item: any) => item.value));
                        }}
                        name={name}
                        ref={ref}
                        placeholder="Categoria..."
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: "#ddd",
                            padding: "0px",
                            minHeight: "0",
                            fontSize: "14px",
                          }),
                        }}
                      />
                    )}
                  />
                </Container>
                <Container
                  maxW="100%"
                  padding="0"
                  flex="1"
                  marginLeft="20px"
                  sx={{
                    "@media screen and (max-width: 1199px)": {
                      marginLeft: "0px",
                      marginTop: "1rem",
                    },
                  }}
                >
                  <label htmlFor="price">Preço do prato</label>
                  <CurrencyInput
                    placeholder="R$"
                    decimalsLimit={2}
                    intlConfig={{ locale: "pt-br", currency: "BRL" }}
                    style={{
                      border: "1px solid #ddd",
                      width: "100%",
                      borderRadius: "3px",
                      padding: "7.5px",
                      fontSize: "14px",
                    }}
                    {...register("price")}
                  />
                </Container>
              </Container>
              <Container maxW="100%" padding="0">
                <label htmlFor="description">Descrição:</label>
                <Textarea
                  placeholder="Descrição do prato..."
                  resize="none"
                  height="auto"
                  rows={4}
                  id="description"
                  {...register("description")}
                />
              </Container>
              <Container maxW="100%" padding="0" marginTop="15px">
                <label htmlFor="">Imagens do prato:</label>
                <Container
                  maxW="100%"
                  padding="0"
                  display="flex"
                  alignItems="center"
                >
                  <Input
                    type="file"
                    size="sm"
                    accept="image/png, image/gif, image/jpeg"
                    multiple={true}
                    hidden
                    ref={refInput}
                    onChange={(event) => {
                      eventImages(event.target.files);
                    }}
                  />
                  <Input
                    type="text"
                    disabled
                    border="1px solid #ccc"
                    opacity="1 !important"
                    size="sm"
                    placeholder={placeHolderFiles}
                  />
                  <Button
                    fontWeight="normal"
                    fontSize="14px"
                    borderRadius="0 3px 3px 0"
                    height="32px"
                    backgroundColor="red"
                    color="white"
                    onClick={() => refInput.current!.click()}
                    _disabled={{ opacity: "0.5", pointerEvents: "none" }}
                  >
                    Adicionar
                  </Button>
                </Container>
              </Container>
            </article>
          </CardSection>
          <CardSection>
            <TitleSection>Pratos</TitleSection>
            <article>
              <ImagesCarrosel images={thumbImages} />
              <Button
                color="white"
                backgroundColor="red"
                fontWeight="normal"
                borderRadius="0.25rem"
                width="100%"
                size="sm"
                margin="5px auto"
                type="submit"
              >
                Salvar
              </Button>
              <Button
                color="white"
                backgroundColor="black"
                fontWeight="normal"
                borderRadius="0.25rem"
                width="100%"
                size="sm"
              >
                Deletar Imagens
              </Button>
            </article>
          </CardSection>
        </Form>
      </Container>
    </BaseLayout>
  );
};
