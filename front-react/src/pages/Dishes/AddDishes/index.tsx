import { Container, Input, Textarea } from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { CardSection } from "@components/CardSection";
import { ImagesCarrosel } from "@components/ImagesCarrosel";
import { MultipleSelect as Select } from "@components/MultipleSelect";
import { TitleSection } from "@components/TitleSection";
import React from "react";
import InputMask from "react-input-mask";
import { Form } from "./styled";
import { Button } from "@chakra-ui/react";

export const DishesComponent = (): JSX.Element => {
  const [priceInput, setPriceInput] = React.useState<string>("");
  const [toogleMaskCurrency, setToogleMaskCurreny] =
    React.useState<boolean>(false);
  const [images, setImages] = React.useState<string[]>([]);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const addImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setImages([]);
    const { files } = event.target;
    Array.from(files!).forEach((file: File) => {
      const url = URL.createObjectURL(file);
      setImages((oldImages) => [...oldImages, url]);
    });
  };

  return (
    <BaseLayout>
      <Container
        maxW="100%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <CardSection>
          <TitleSection>Adicionar Prato</TitleSection>
          <article>
            <Form>
              <div>
                <label htmlFor="dishes">Nome do prato</label>
                <Input
                  placeholder="Lasanha de 4 queijos"
                  size="sm"
                  type="text"
                  id="dishes"
                />
              </div>
              <Container
                maxW="100%"
                padding="0"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Container maxW="100%" padding="0" flex="1">
                  <label htmlFor="category">Seleciona a categoria</label>
                  <Select
                    options={options}
                    isMulti
                    placeholder="Categorias do Prato..."
                    isSearchable={true}
                    inputId="category"
                  />
                </Container>
                <Container maxW="100%" padding="0" flex="1" marginLeft="20px">
                  <label htmlFor="price">Preço do prato</label>
                  <Input
                    placeholder="R$"
                    size="sm"
                    type="text"
                    as={InputMask}
                    mask={toogleMaskCurrency ? "R$ 999,99" : "R$ 99,99"}
                    maskChar=""
                    id="price"
                    onChange={(e) => {
                      setPriceInput(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      priceInput.length >= 8
                        ? setToogleMaskCurreny(true)
                        : setToogleMaskCurreny(false);
                    }}
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
                />
              </Container>
              <Container maxW="100%" padding="0">
                <label htmlFor="">Imagens do prato:</label>
                <Input
                  type="file"
                  size="sm"
                  accept="image/png, image/gif, image/jpeg"
                  multiple={true}
                  onChange={(event) => addImage(event)}
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
      </Container>
    </BaseLayout>
  );
};
