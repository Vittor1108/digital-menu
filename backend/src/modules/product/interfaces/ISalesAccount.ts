import { CustomerOrder } from '@prisma/client';

export interface ISalesAccount {
  valueSales: number;
  orders: CustomerOrder[];
}

export interface IGetSalesAccount {
  establishmentId: number;
  lte?: Date | string;
  gte?: Date | string;
}
