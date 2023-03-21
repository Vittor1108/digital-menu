import { Button, Container, Input, InputRightAddon, Textarea } from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { CardSection } from "@components/CardSection";
import { ImagesCarrosel } from "@components/ImagesCarrosel";
import { TitleSection } from "@components/TitleSection";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IForm } from "./interfaces/IForm";
import { Form } from "./styled";

const schemaForm = yup.object({
    name: yup.string().required("Nome do prato é obrigatório"),
    description: yup.string().required("Descrição do prato é obrigatória"),
    files: yup.mixed().required("Imagem da categoria é obrigatória"),
});

export const CategoryComponent = (): JSX.Element => {

    const inputFileRef = React.useRef<HTMLInputElement | null>(null);

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

    const onSubmit = (data: IForm): void => {
        console.log(data);
    }


    return (
        <BaseLayout isLoading={false}>
            <Container
                maxW="100%"
                h="100%"
            >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <CardSection>
                        <TitleSection>Adicionar Categoria</TitleSection>
                        <article>
                            <Container maxW="100%" padding="0" marginBottom="15px">
                                <label htmlFor="category">Nome da Categoria</label>
                                <Input
                                    placeholder="Lasanha de 4 queijos"
                                    size="sm"
                                    type="text"
                                    id="category"
                                    {...register("name")}
                                />
                            </Container>
                            <Container maxW="100%" padding="0" marginBottom="15px">
                                <label htmlFor="description">Descrição:</label>
                                <Textarea
                                    placeholder="Descrição da Categoria..."
                                    resize="none"
                                    height="auto"
                                    rows={4}
                                    id="description"
                                    {...register("description")}
                                />
                            </Container>
                            <Container maxW="100%" padding="0">
                                <label htmlFor="">Imagens da Categoria:</label>
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
                                        {...register("files")}
                                        ref={inputFileRef}
                                    />
                                    <Input
                                        type="text"
                                        disabled
                                        border="1px solid #ccc"
                                        opacity="1 !important"
                                        size="sm"
                                        placeholder="Nenhuma Foto"
                                    />
                                    <Button
                                        fontWeight="normal"
                                        fontSize="14px"
                                        borderRadius="0 3px 3px 0"
                                        height="32px"
                                        backgroundColor="red"
                                        color="white"
                                        onClick={() => { inputFileRef.current!.click(); }}
                                        _disabled={{ opacity: "0.5", pointerEvents: "none" }}
                                    >
                                        Adicionar
                                    </Button>
                                </Container>
                            </Container>
                        </article>
                    </CardSection>
                    <CardSection>
                        <TitleSection>Categorias</TitleSection>
                        <article>
                            <ImagesCarrosel images={[]} />
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
}