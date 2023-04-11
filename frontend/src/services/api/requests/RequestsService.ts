import { Axios } from "../axiosConfig";
import { ApiException } from "../ApiException";
import { IRequests } from "@interfaces/IRequests";
import { AxiosResponse } from "axios";

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

export const RequestsService = {
  getByStatus,
  update,
};
