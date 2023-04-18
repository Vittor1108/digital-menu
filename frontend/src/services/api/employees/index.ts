import { Axios } from "../axiosConfig";
import { IEmployee } from "./interfaces";
import { AxiosResponse } from "axios";

const create = async (data: IEmployee): Promise<AxiosResponse<IEmployee>> => {
  return await Axios().post<IEmployee>("/employees", data);
};

export const EmployeeService = {
  create,
};
