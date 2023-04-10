import { Axios } from "../axiosConfig";
import { ApiException } from "../ApiException";
import { IRequests } from "@interfaces/IRequests";
import { AxiosResponse } from "axios";

const getByStatus = async (
  status: number
): Promise<AxiosResponse<IRequests[]>> => {
  return await Axios().get(`/customer-order/status=${status}`);
};

export const RequestsService = {
  getByStatus,
};
