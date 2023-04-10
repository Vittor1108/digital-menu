import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateCustomerOrderDto } from './dto/update-customer-order.dto';
import { CustomerOrder } from './entities/customer-order.entity';

@Injectable()
export class CustomerOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  public create = async (
    createDto: CreateCustomerOrderDto,
    req: IReq,
  ): Promise<any> => {
    const products = await this.prismaService.product.findMany({
      where: {
        id: {
          in: createDto.orders.map((element) => Number(element.idProduct)),
        },
        AND: {
          establishmentId: req.user.id,
        },
      },
    });

    if (products.length < createDto.orders.length) {
      throw new HttpException(
        'Produto com o id(s) não econtrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const orderPrice = products.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    const order = await this.prismaService.customerOrder.create({
      data: {
        customerName: createDto.customerName,
        comments: createDto.comments,
        establishmentId: req.user.id,
        orderPrice,
        OrderedProduct: {
          createMany: {
            data: createDto.orders.map((element) => {
              return {
                productId: element.idProduct,
                quantity: element.qtd,
              };
            }),
          },
        },
      },
      select: {
        id: true,
        customerName: true,
        comments: true,
        status: true,
        orderPrice: true,
        OrderedProduct: {
          select: {
            customerOrderId: true,
            product: {
              select: {
                name: true,
              },
            },
            quantity: true,
          },
        },
      },
    });

    return order;
  };
}
