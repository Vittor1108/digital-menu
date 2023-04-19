import { CustomerOrder } from '@prisma/client';

export interface ISalesAccount {
  valueSales: number;
  orders: CustomerOrder[];
}
