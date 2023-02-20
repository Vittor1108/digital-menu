import { Status } from '@prisma/client';

export class CustomerOrder {
  id?: number;
  customerName: string;
  status: Status;
  establishmentId?: number;
  orderPrice: number;
  dataOrder?: Date;
}
