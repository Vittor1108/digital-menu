import { Container } from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { CardSection } from "@components/CardSection";
import { TitleSection } from "@components/TitleSection";
import { Input } from "@chakra-ui/react";
import { Form } from "./styled";
import { MultipleSelect as Select } from "@components/MultipleSelect";
export const DishesComponent = (): JSX.Element => {
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
              <div>
                <label htmlFor="dishes">Seleciona a categoria</label>
                <Select
                  options={options}
                  isMulti
                  placeholder="Categorias do Prato..."
                  isSearchable={true}
                  // styles={}
                />
              </div>
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
