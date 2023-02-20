import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';

@Injectable()
export class CustomerOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  public create = async (createDto: CreateCustomerOrderDto, req: IReq) => {
    const products = await this.prismaService.product.findMany({
      where: {
        establishmentId: req.user.establishmentId,
        AND: {
          id: {
            in: createDto.orders,
          },
        },
      },
    });

    if (products.length < createDto.orders.length) {
      throw new HttpException(
        'Produto(s) com o id(s) especificado não existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    const orderPrice = products.reduce(
      (acc, product) => acc + product.price,
      0,
    );

    return orderPrice;
  };
}
