import { Button, Container, Input, Textarea, useToast } from "@chakra-ui/react";
import { FieldErrorMessage } from "@components/BaseForm/FieldErrorMessage";
import { BaseLayout } from "@components/BaseLayout";
import { CardSection } from "@components/CardSection";
import { ImagesCarrosel } from "@components/ImagesCarrosel";
import { TitleSection } from "@components/TitleSection";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategorieService } from "@services/api/categories";
import { DishesService } from "@services/api/dishes";
import { AxiosError } from "axios";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Select, { MultiValue } from "react-select";
import * as yup from "yup";
import { ICategorieSelect } from "./interfaces/ICategorieSelect";
import { IForm } from "./interfaces/IForm";
import { Form } from "./styled";
import { IDishes } from "@interfaces/IDishes";

const schemaForm = yup.object({
  name: yup.string().required("Nome do prato é obrigatório"),
  price: yup.string().required("Preço do prato é obrigatório"),
  description: yup.string().required("Descrição do prato é obrigatória"),
});

const getDishesById = async (id: number) => {
  return await DishesService.getDisheById(id);
};

const updatedDisheById = async (
  id: number,
  { name, price, categoriesId, description, avargePrice }: IDishes
) => {
  const params = {
    name,
    price,
    categoriesId,
    description,
    avargePrice,
  };

  console.log(params);

  return DishesService.updatedDishe(id, params);
};

export const DishesComponent = (): JSX.Element => {
  const [images, setImages] = React.useState<string[]>([]);
  const [files, setFiles] = React.useState<File[] | FileList | null>(null);
  const [productId, setProductId] = React.useState<number | undefined>(
    undefined
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [categories, setCategories] =
    React.useState<MultiValue<ICategorieSelect> | null>([]);
  const [priceInput, setPriceInput] = React.useState<number>();
  const useSnack = useToast();
  const formData = new FormData();
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(
    "getAllCategories",
    async () => {
      const request = await CategorieService.getAllCategories();
      return request.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(schemaForm),
  });

  const createProduct = useQuery(
    "createProduct",
    async () => {
      const params = {
        name: getValues().name,
        price: Number(
          getValues().price.toString().replace("R$", "").replace(",", ".")
        ),
        categoriesId: categories!.map((category) => Number(category.value)),
        description: getValues().description,
        avargePrice: null,
      };
      const request = await DishesService.createProduct(params);
      return request.data;
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const requestProductImage = useQuery(
    ["disheImage", files, productId],
    async () => {
      const params = {
        files: files!,
        productId: productId!,
      };
      const request = await DishesService.createImageProduct(params);
      return request.data;
    },
    {
      enabled: false,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const requestDishesById = useQuery(
    ["dishe", id],
    async () => {
      if (id) {
        const request = await getDishesById(Number(id));
        return request.data;
      }
    },
    { enabled: false, retry: false }
  );

  const updatedDishe = useQuery(
    ["updatedDishe", id],
    async () => {
      const params = {
        name: getValues().name,
        price: Number(
          getValues().price.toString().replace("R$", "").replace(",", ".")
        ),
        categoriesId: getValues().categoriesId,
        description: getValues().description,
        avargePrice: null,
      };

      if (id) {
        const request = await updatedDisheById(Number(id), params);
        return request.data;
      }
    },
    {
      enabled: false,
      retry: false,
    }
  );

  const setArrayCategories = (): ICategorieSelect[] => {
    if (data) {
      return data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
    }

    if (isError) {
      useSnack({
        title: "Erro ao carregar categorias",
        description:
          "Não foi possível carregar todas as categorias cadastradas. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    return [];
  };

  const addImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setImages([]);
    const { files } = event.target;
    Array.from(files!).forEach((file: File) => {
      const url = URL.createObjectURL(file);
      setImages((oldImages) => [...oldImages, url]);
    });
  };

  const resetForm = (): void => {
    setCategories([]);
    setImages([]);
    reset();
  };

  const addInfoImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFiles((event.target as HTMLInputElement).files);
  };

  const addProductImage = async (): Promise<void> => {
    const response = await requestProductImage.refetch();
    if (!response.data) {
      useSnack({
        title: "Prato criado.",
        description: `Prato criado. Porém a foto não adicionada. Confira o prato em editar`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      resetForm();
      return;
    }

    useSnack({
      title: "Prato Criado!",
      description: `Prato Criado com sucesso!`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    resetForm();
  };

  const cheeckErros = (): boolean => {
    if (!files && !id) {
      useSnack({
        title: "Imagem é obrigatória",
        description: `Adicona uma imagem para criar o prato.`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return true;
    }
    return false;
  };

  const createDisheOnSubmit = (): void => {
    createProduct
      .refetch()
      .then((response) => {
        setLoading(true);
        if (response.error instanceof AxiosError) {
          useSnack({
            title: "Não foi possível criar o produto",
            description: `${response.error.response?.data.message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }

        setProductId(response.data!.id);
        return;
      })
      .catch((e: any) => {
        useSnack({
          title: "Não foi possível criar o prato",
          description: `${e.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        window.scroll(0, 0);
        setLoading(false);
      });
  };

  const appendFiles = (): void => {
    Array.from(files!).forEach((file: any) => {
      formData.append("files", file as File);
    });
  };

  const updatedDisheOnSubmit = (): void => {
    updatedDishe
      .refetch()
      .then((response) => {
        setLoading(true);
        if (response.error instanceof AxiosError) {
          useSnack({
            title: "Não foi possível atualizar o produto",
            description: `${response.error.response?.data.message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }

        setProductId(response.data!.id);
        return;
      })
      .catch((e: any) => {
        useSnack({
          title: "Não foi possível atualizar o prato",
          description: `${e.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        window.scroll(0, 0);
        setLoading(false);
      });
  };

  const onSubmit = React.useCallback((): void => {
    if (cheeckErros()) return;

    if (!id) {
      appendFiles();
      createDisheOnSubmit();
      return;
    }

    updatedDisheOnSubmit();
  }, [images]);

  const setValuesField = (data: IDishes): void => {
    const categoriesValues: { value: number; label: string }[] =
      data.ProductCategory!.map((item) => {
        return {
          value: item.category.id,
          label: item.category.name,
        };
      });

    const imagesUrl: string[] = data.ProductPhoto!.map((photo) => photo.url);

    const categoriesId: number[] = data.ProductCategory!.map(
      (item) => item.category.id
    );

    setImages(imagesUrl);
    setPriceInput(data!.price);
    setCategories(categoriesValues);
    setValue("name", data!.name);
    setValue("description", data.description);
    setValue(
      "price",
      data!.price.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })
    );
    setValue("categoriesId", categoriesId);
  };

  const setDataDishe = (): void => {
    requestDishesById
      .refetch()
      .then((response) => {
        setLoading(true);
        const { data } = response;

        if (data) {
          setValuesField(data);
        }
      })
      .catch((e: any) => {
        useSnack({
          title: "Falha ao carregar os dados.",
          description: `${e.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (id) {
      setDataDishe();
      return;
    }
    resetForm();
  }, [id]);

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  React.useEffect(() => {
    if (!productId) return;
    addProductImage();
  }, [productId]);

  return (
    <BaseLayout isLoading={loading}>
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
        <CardSection>
          <TitleSection>Adicionar Prato</TitleSection>
          <article>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="dishes">Nome do prato</label>
                <Input
                  placeholder="Lasanha de 4 queijos"
                  size="sm"
                  type="text"
                  id="dishes"
                  {...register("name")}
                />
                <FieldErrorMessage>{errors.name?.message}</FieldErrorMessage>
              </div>
              <Container
                maxW="100%"
                padding="0"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  "@media screen and (max-width: 1199px)": {
                    display: "block",
                  },
                }}
              >
                <Container maxW="100%" padding="0" flex="1">
                  <label htmlFor="category">Seleciona a categoria</label>
                  <Select
                    isMulti={true}
                    isSearchable={true}
                    options={setArrayCategories()}
                    placeholder="categoria"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: "#ddd",
                        padding: "0px",
                        minHeight: "0",
                        fontSize: "14px",
                      }),
                    }}
                    onChange={(value) => {
                      setCategories(value);
                    }}
                    value={categories}
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
                    defaultValue={priceInput}
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
                    onChange={(e) => {
                      setPriceInput(Number(e.target.value));
                    }}
                  />
                  <FieldErrorMessage>{errors.price?.message}</FieldErrorMessage>
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
                <FieldErrorMessage>
                  {errors.description?.message}
                </FieldErrorMessage>
              </Container>
              <Container maxW="100%" padding="0">
                <label htmlFor="">Imagens do prato:</label>
                <Input
                  type="file"
                  size="sm"
                  accept="image/png, image/gif, image/jpeg"
                  multiple={true}
                  onChange={(event) => {
                    addImage(event);
                    addInfoImage(event);
                  }}
                />
              </Container>
            </Form>
          </article>
        </CardSection>
        <CardSection>
          <TitleSection>Pratos</TitleSection>
          <article>
            <ImagesCarrosel images={images} />
            <Button
              color="white"
              backgroundColor="red"
              fontWeight="normal"
              borderRadius="0.25rem"
              width="100%"
              size="sm"
              margin="5px auto"
              onClick={handleSubmit(onSubmit)}
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
              onClick={() => {
                setImages([]);
                setFiles([]);
              }}
            >
              Deletar Imagens
            </Button>
          </article>
        </CardSection>
      </Container>
    </BaseLayout>
  );
};
