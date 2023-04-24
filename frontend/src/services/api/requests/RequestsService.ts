import { Axios } from "../axiosConfig";
import { ApiException } from "../ApiException";
import { IRequests } from "@interfaces/IRequests";
import { AxiosResponse } from "axios";
import { IDishes } from "@interfaces/IDishes";
import { IMoreOrdes } from "./interfaces";

const getByStatus = async (
  status: number
): Promise<AxiosResponse<IRequests[]>> => {
  return await Axios().get<IRequests[]>(`/customer-order/status=${status}`);
};

const update = async (
  data: IRequests,
  id: number
): Promise<AxiosResponse<IRequests>> => {
  return await Axios().put<IRequests>(`/customer-order/${id}`, data);
};

const getAll = async (): Promise<AxiosResponse<IRequests[]>> => {
  return await Axios().get<IRequests[]>("/customer-order");
};

const getRecents = async (qtd: number): Promise<AxiosResponse<IDishes[]>> => {
  return await Axios().get<IDishes[]>(`customer-order/recent/qtd=${qtd}`);
};

const getMoreOrdes = async (): Promise<AxiosResponse<IMoreOrdes[]>> => {
  return await Axios().get<IMoreOrdes[]>(`customer-order/moreOrders`);
};

export const RequestsService = {
  getByStatus,
  update,
  getAll,
  getRecents,
  getMoreOrdes,
};
