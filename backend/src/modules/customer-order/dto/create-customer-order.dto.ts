import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateCustomerOrderDto {
  @IsString()
  customerName: string;

  @IsString()
  @IsOptional()
  comments?: string;

  @IsArray()
  orders: number[];
}

// id              Int      @id @default(autoincrement())
//   customerName    String
//   comments        String?
//   status          Status   @default(RECEIVED)
//   establishmentId Int
//   orderPrice      Float
//   dateOrder       DateTime @default(now())
