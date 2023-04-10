export interface IRequests {
  id?: number;
  customerName: string;
  comments?: string;
  status: Status;
  orderPrice: number;
  dataOrder: Date;
}

enum Status {
  RECEIVED,
  PREPARATION,
  FINISHED,
  CONCLUDED,
}
