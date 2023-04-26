import { IPagination } from "@interfaces/IPagination";
import { Axios } from "../axiosConfig";
import { IEmployee } from "./interfaces";
import { AxiosResponse } from "axios";
import { BsDatabaseGear } from "react-icons/bs";

const create = async (data: IEmployee): Promise<AxiosResponse<IEmployee>> => {
  return await Axios().post<IEmployee>("/employees", data);
};

const getAll = async (
  dataGet: IPagination
): Promise<AxiosResponse<{ quantity: number; employees: IEmployee[] }>> => {
  return await Axios().get<{ quantity: number; employees: IEmployee[] }>(
    `employees/take=${dataGet.take}/skip=${dataGet.skip}/text=${dataGet.text}`
  );
};

const deleted = async (id: number): Promise<AxiosResponse<boolean>> => {
  return await Axios().delete<boolean>(`employees/${id}`);
};

const get = async (id: number): Promise<AxiosResponse<IEmployee>> => {
  return await Axios().get<IEmployee>(`employees/${id}`);
};

const update = async (
  id: number,
  data: IEmployee
): Promise<AxiosResponse<IEmployee>> => {
  return await Axios().put<IEmployee>(`employees/${id}`, {
    name: data.name,
    cpf: data.cpf,
    password: data.password,
    acessScreens: data.acessScreens,
  });
};

export const EmployeeService = {
  create,
  getAll,
  deleted,
  get,
  update,
};
