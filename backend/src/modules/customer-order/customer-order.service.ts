import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateCustomerOrderDto } from './dto/update-customer-order.dto';
import {
  CustomerOrder,
  OrderedProduct,
} from './entities/customer-order.entity';

@Injectable()
export class CustomerOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  public create = async (
    createDto: CreateCustomerOrderDto,
    req: IReq,
  ): Promise<CustomerOrder> => {
    const order = await this.prismaService.customerOrder.create({
      data: {
        customerName: createDto.customerName,
        comments: createDto.comments,
        establishmentId: req.user.id,
        orderPrice: await this.calcOrderprice(
          req.user.establishmentId,
          createDto,
        ),
        OrderedProduct: {
          createMany: {
            data: createDto.orders.map((element) => {
              return {
                productId: Number(element.idProduct),
                quantity: Number(element.qtd),
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
                id: true,
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

  public getByStatus = async (
    req: IReq,
    status: number,
  ): Promise<CustomerOrder[]> => {
    let textStatus;
    switch (status) {
      case 1:
        textStatus = 'PREPARATION';
        break;
      case 2:
        textStatus = 'FINISHED';
        break;
      case 3:
        textStatus = 'CONCLUDED';
        break;
      default:
        textStatus = 'RECEIVED';
    }

    return await this.prismaService.customerOrder.findMany({
      where: {
        establishmentId: req.user.id,
        AND: {
          status: textStatus,
        },
      },

      select: {
        id: true,
        customerName: true,
        comments: true,
        status: true,
        orderPrice: true,
        dateOrder: true,
        OrderedProduct: {
          select: {
            customerOrderId: true,
            product: {
              select: {
                id: true,
                name: true,
              },
            },
            quantity: true,
          },
        },
      },
    });
  };

  public getAll = async (req: IReq) => {
    const orders = await this.prismaService.customerOrder.findMany({
      where: {
        establishmentId: req.user.establishmentId,
      },
    });

    return orders;
  };

  public getOne = async (id: number): Promise<CustomerOrder> => {
    const order = await this.prismaService.customerOrder.findUnique({
      where: {
        id: Number(id),
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
                id: true,
                name: true,
              },
            },
            quantity: true,
          },
        },
      },
    });

    if (!order) {
      throw new HttpException(
        `Pedido com o id ${id} não encontrado!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return order;
  };

  public update = async (
    id: number,
    updateDto: UpdateCustomerOrderDto,
  ): Promise<CustomerOrder> => {
    const order = await this.getOne(id);

    await this.prismaService.customerOrder.update({
      where: {
        id: Number(id),
      },

      data: {
        OrderedProduct: {
          deleteMany: {
            customerOrderId: {
              in: order.OrderedProduct.map((element) =>
                Number(element.customerOrderId),
              ),
            },
          },
        },
      },
    });

    return await this.prismaService.customerOrder.update({
      where: {
        id: Number(id),
      },
      data: {
        customerName: updateDto.customerName,
        comments: updateDto.comments,
        status: updateDto.status,
        orderPrice: await this.calcOrderprice(order.establishmentId, updateDto),
        finalTime: updateDto.finalTime,
        timeFinished: updateDto.timeFinished,
        timePreparation: updateDto.timePreparation,
        timeReceived: updateDto.timeReceived,
        OrderedProduct: {
          createMany: {
            data: updateDto.orders.map((element) => {
              return {
                productId: Number(element.idProduct),
                quantity: Number(element.qtd),
              };
            }),
          },
        },
      },
    });
  };

  public delete = async (id: number): Promise<boolean> => {
    await this.getOne(id);

    await this.prismaService.customerOrder.delete({
      where: {
        id,
      },
    });

    return true;
  };

  private calcOrderprice = async (
    establishmentId: number,
    data: CreateCustomerOrderDto | UpdateCustomerOrderDto,
  ) => {
    const products = await this.prismaService.product.findMany({
      where: {
        establishmentId,
        AND: {
          id: {
            in: data.orders.map((element) => Number(element.idProduct)),
          },
        },
      },
    });

    if (products.length < data.orders.length) {
      throw new HttpException(
        'Produto com o id(s) não econtrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const orderPrice = products.reduce((acc, item, index) => {
      return acc + item.price * data.orders[index].qtd;
    }, 0);

    return orderPrice;
  };
}
