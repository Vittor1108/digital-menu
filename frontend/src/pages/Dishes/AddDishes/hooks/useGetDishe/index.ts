import { useToast } from "@chakra-ui/react"
import { DishesService } from "@services/api/dishes"
import { queryObject } from "@utils/queryObject"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

export const useGetDishe = (id: number | null) => {

    const useSnack = useToast();
    const navigate = useNavigate();

    const request = useQuery([queryObject.getDishe], async () => {
        const request = await DishesService.getDisheById(Number(id));
        return request.data;
    }, {
        enabled: !!id,
        retry: false,
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
        dataDishe: request.data,
        dataDisheIsLoading: request.isLoading
    }
}