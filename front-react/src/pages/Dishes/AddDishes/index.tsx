import { Container, Input } from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { CardSection } from "@components/CardSection";
import { MultipleSelect as Select } from "@components/MultipleSelect";
import { TitleSection } from "@components/TitleSection";
import React from "react";
import InputMask from "react-input-mask";
import { Form } from "./styled";

export const DishesComponent = (): JSX.Element => {
  const [priceInput, setPriceInput] = React.useState<string>("");
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
          <TitleSection>Teste</TitleSection>
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
                    mask={"R$ 999,99"}
                    id="price"
                    onChange={(e) => setPriceInput(e.target.value)}
                  />
                </Container>
              </Container>
            </Form>
          </article>
        </CardSection>

        <CardSection>
          <TitleSection>Teste</TitleSection>
          <article></article>
        </CardSection>
      </Container>
    </BaseLayout>
  );
};
