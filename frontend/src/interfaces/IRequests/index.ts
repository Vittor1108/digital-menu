import { EStatusRequest } from "@enums/EStatusRequest";

export interface IRequests {
  id?: number;
  customerName: string;
  comments?: string;
  status: EStatusRequest;
  orderPrice: number;
  dateOrder: Date;
  OrderedProduct?: IOrderedProduct[];
}

export interface IOrderedProduct {
  customerOrderId: number;
  product: {
    id: number;
    name: string;
  };
  quantity: number;
}

