import { Container, Input, Textarea } from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { CardSection } from "@components/CardSection";
import { ImagesCarrosel } from "@components/ImagesCarrosel";
import { MultipleSelect as Select } from "@components/MultipleSelect";
import { TitleSection } from "@components/TitleSection";
import React, { ChangeEvent } from "react";
import InputMask from "react-input-mask";
import { Form } from "./styled";

export const DishesComponent = (): JSX.Element => {
  const [priceInput, setPriceInput] = React.useState<string>("");
  const [toogleMaskCurrency, setToogleMaskCurreny] =
    React.useState<boolean>(false);
  const [images, setImages] = React.useState<any>([]);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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
                />
              </Container>
            </Form>
          </article>
        </CardSection>
        <CardSection>
          <TitleSection>Pratos</TitleSection>
          <article>
            <ImagesCarrosel images={["images"]} />
          </article>
        </CardSection>
      </Container>
    </BaseLayout>
  );
};
