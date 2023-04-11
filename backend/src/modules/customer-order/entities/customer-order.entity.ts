import { Status } from '@prisma/client';

export class CustomerOrder {
  id?: number;
  customerName: string;
  status: Status;
  establishmentId?: number;
  orderPrice: number;
  dataOrder?: Date;
  OrderedProduct?: OrderedProduct[];
}

export class OrderedProduct {
  customerOrderId: number;
  product: {
    id: number;
    name: string;
  };
  quantity: number;
}
