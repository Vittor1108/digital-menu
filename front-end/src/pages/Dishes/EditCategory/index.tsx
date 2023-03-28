import { BaseLayout } from "@components/BaseLayout"
import { Container } from "@chakra-ui/react"
import { DefaulTable } from "@components/DefaultTable"

export const EditCategoryComponent = (): JSX.Element => {
    return (
        <BaseLayout isLoading={[false]}>
            <Container maxW="100%" padding="0">
                <DefaulTable title="Lista de Categorias" />
            </Container>
        </BaseLayout>
    )
}