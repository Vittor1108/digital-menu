export interface IRequests {
  id?: number;
  customerName: string;
  comments?: string;
  status: Status;
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

enum Status {
  RECEIVED,
  PREPARATION,
  FINISHED,
  CONCLUDED,
}
