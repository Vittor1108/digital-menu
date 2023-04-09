import { useToast } from "@chakra-ui/react"
import { IPagination } from "@interfaces/IPagination"
import { CategorieService } from "@services/api/categories"
import { queryObject } from "@utils/queryObject"
import { useQuery } from "react-query"

export const useGetAllCategories = (dataGet?: IPagination) => {
    const useSnack = useToast();

    const fetchCategories = useQuery([queryObject.getAllCategories], async () => {
        const request = await CategorieService.getAllCategories(dataGet);
        return request.data;
    },
        {
            onError: (e: any) => {
                useSnack({
                    title: "Error.Tente novamente",
                    description: `${e.response?.data.message}`,
                    status: "error",
                    duration: 7000,
                    isClosable: true,
                });
            }
        })


    return {
        ...fetchCategories,
        dataFetchCategories: fetchCategories.data,
        categoriesIsLoading: fetchCategories.isLoading,
    }
}