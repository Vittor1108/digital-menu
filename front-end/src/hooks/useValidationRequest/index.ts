import { AxiosResponse } from "axios";

export const useValidationResquest = () => {
    const validationRequest = <T>(request: T, callBackError: Function, callBackSuccess: Function) => {
        console.log(callBackError);
        console.log(callBackSuccess);
        console.log(request);
    }

    return [validationRequest]
}