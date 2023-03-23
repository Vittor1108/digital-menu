import { useToast } from "@chakra-ui/react"
import { CategorieService } from "@services/api/categories"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom";
import { TUseCreateCategory } from "../useCreateCategory/types";
import { TUseGetCategory } from "./types";

export const useGetCategory = (): TUseGetCategory => {
    const useSnack = useToast();
    const navigate = useNavigate();
    
    const getCategory = useMutation((id: number) => CategorieService.getCategory(id), {
        onError: (e: any) => {
            useSnack({
                title: "Error. Tente novamente",
                description: `${e.response.data.message}`,
                status: "warning",
                duration: 7000,
                isClosable: true,
            });
            navigate("/category");
        }
    });


    return [getCategory];
}