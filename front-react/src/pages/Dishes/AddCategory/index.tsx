import { Button, Container, Input, Textarea, useToast } from "@chakra-ui/react";
import { BaseLayout } from "@components/BaseLayout";
import { CardSection } from "@components/CardSection";
import { ImagesCarrosel } from "@components/ImagesCarrosel";
import { TitleSection } from "@components/TitleSection";
import { yupResolver } from "@hookform/resolvers/yup";
import { useThumbImages } from "@hooks/useThumbImages";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCreateCategory } from "./hooks/useCreateCategory";
import { IForm } from "./interfaces/IForm";
import { Form } from "./styled";
import { FieldErrorMessage } from "@components/BaseForm/FieldErrorMessage";
import { useParams } from "react-router-dom";
import { useGetCategory } from "./hooks/useGetCategory";
import { IPhoto } from "@interfaces/IPhoto";
import { useUpdateCategory } from "./hooks/useUpdateCategory";
import { useDelImgCategory } from "./hooks/useDelImgCategory";


const schemaForm = yup.object({
    name: yup.string().required("Nome do prato é obrigatório"),
    description: yup.string().required("Descrição do prato é obrigatória"),
});

const validationForm = (files: string[]): boolean => {
    if (!files.length) return true;
    return false;
}


export const CategoryComponent = (): JSX.Element => {
    const [placeHolderFiles, setPlaceholderFiles] = React.useState<string>("Nenhuma Foto");
    const [thumbImages, setThumbImages] = React.useState<string[]>([]);
    const inputFileRef = React.useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = React.useState<FileList | null | IPhoto[]>(null);
    const [urlImages, genFiles, genPlaceholder] = useThumbImages();
    const [createCategory, createImageCategory] = useCreateCategory();
    const [requestGetCategory] = useGetCategory();
    const [updateCategory] = useUpdateCategory();
    const [delImages] = useDelImgCategory();
    const useSnack = useToast();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<IForm>({
        resolver: yupResolver(schemaForm),
    });

    const onSubmit = async (data: IForm): Promise<void> => {
        if (validationForm(thumbImages)) {
            useSnack({
                title: "Imagem obrigatória!",
                description: "Adiciona a imagem da categoria.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        if (!id) {
            requestCreateCategory(data);
            resetForm();
            return;
        }

        requestUpdateCategory(data);

    }

    const requestCreateCategory = async (data: IForm): Promise<void> => {
        const request = await createCategory.mutateAsync(data);

        const params = {
            files,
            id: Number(request.data.id),
        };

        await createImageCategory.mutateAsync(params);
    }

    const resetForm = (): void => {
        setThumbImages(urlImages(null));
        setPlaceholderFiles(genPlaceholder(null));
        setFiles(genFiles(null));
        reset();
    }

    const eventImages = (fileList: FileList | null | IPhoto[]): void => {
        setPlaceholderFiles(genPlaceholder(fileList));
        setThumbImages(urlImages(fileList));
        setFiles(genFiles(fileList));
    }


    const getCategory = async (id: number): Promise<void> => {
        const { data } = await requestGetCategory.mutateAsync(Number(id));
        setValue("name", data.name);
        setValue("description", data.description);
        eventImages(data.PhotoCategory!);
    }

    const requestUpdateCategory = async (data: IForm): Promise<void> => {
        const params = {
            id: Number(id!),
            name: data.name,
            description: data.description
        }

        const paramsFiles = {
            id: Number(id!),
            files,
        }

        await updateCategory.mutateAsync(params);
        await delImages.mutateAsync(Number(id));
        await createImageCategory.mutateAsync(paramsFiles);
    }

    const onDelete = (): void => {
        setThumbImages(urlImages(null));
        setPlaceholderFiles(genPlaceholder(null));
        setFiles(genFiles(null));
    }

    React.useEffect(() => {
        if (id) {
            getCategory(Number(id));
        }
    }, [id])

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
                                <FieldErrorMessage>{errors.name?.message}</FieldErrorMessage>
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
                                <FieldErrorMessage>{errors.description?.message}</FieldErrorMessage>
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

                                        ref={inputFileRef}
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
                                        onClick={() => { inputFileRef.current!.click(); }}
                                        isDisabled={files?.length ? true : false}
                                        _disabled={{ opacity: "0.5", pointerEvents: "none" }}
                                    >
                                        Adiconar
                                    </Button>
                                </Container>
                            </Container>
                        </article>
                    </CardSection>
                    <CardSection>
                        <TitleSection>Categorias</TitleSection>
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
                                onClick={() => onDelete()}
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