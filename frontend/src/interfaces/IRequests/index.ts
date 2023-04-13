import { EStatusRequest } from "@enums/EStatusRequest";

export interface IRequests {
  id?: number;
  customerName: string;
  comments?: string;
  status: EStatusRequest;
  orderPrice: number;
  dateOrder: Date;
  OrderedProduct?: IOrderedProduct[];
  timeReceived?: Date;
  timePreparation?: Date;
  timeFinished?: Date;
  finalTime?: Date;
}

export interface IOrderedProduct {
  customerOrderId: number;
  product: {
    id: number;
    name: string;
  };
  quantity: number;
}

export interface IUpdatedRequest {
  id: number;
  customerName: string;
  comments: string;
  orders: Array<{ idProduct: number; qtd: number }>;
  status: EStatusRequest;
  timePreparation?: Date;
  timeFinished?: Date;
  timeReceived?: Date;
  finalTime?: Date;
}
