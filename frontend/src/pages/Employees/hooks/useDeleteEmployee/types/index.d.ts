export type TUseDeleteEmployee = {
  fetchDeleteEmployee: UseMutationResult<
    AxiosResponse<boolean, any>,
    any,
    number,
    unknown
  >;
};
