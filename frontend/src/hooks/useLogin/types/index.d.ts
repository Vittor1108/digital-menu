import { UseMutationResult } from "react-query";

export type TUseLogin = {
  loginRequest: UseMutationResult<
    AxiosResponse<{
      token: string;
    }>,
    {
      login: string;
      password: string;
    }
  >;
};
