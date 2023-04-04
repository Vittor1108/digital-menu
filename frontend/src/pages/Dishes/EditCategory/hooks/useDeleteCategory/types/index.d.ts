import { UseMutationResult } from "react-query";

export type TUseDeleteCategory = {
    deleteCategory:  UseMutationResult<AxiosResponse<boolean, any>, unknown, number, unknown>
};
