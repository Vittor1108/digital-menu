import { useToast } from "@chakra-ui/react";
import { CategorieService } from "@services/api/categories";
import { queryObject } from "@utils/queryObject";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export const useGetCategory = (id: number | null) => {
    const useSnack = useToast();
    const navigate = useNavigate();

    const request = useQuery([queryObject.getCategory], async () => {
        const request = await CategorieService.getCategory(Number(id));
        return request.data;
    }, {
        enabled: !!id,
        refetchInterval: false,
        onError: (e: any) => {
            useSnack({
                title: "Error. Tente novamente",
                description: `${e.response?.data.message}`,
                status: "error",
                duration: 7000,
                isClosable: true,
            });

            navigate("/category");
        }
    });

    return {
        ...request,
        dataCategory: request.data,
        dataCategoryLoading: request.isLoading
    }

}

