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
  ): Promise<CustomerOrder> => {
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

    const order = await this.prismaService.customerOrder.create({
      data: {
        customerName: createDto.customerName,
        comments: createDto.comments,
        orderPrice,
        establishmentId: req.user.establishmentId,
        OrderedProduct: {
          createMany: {
            data: createDto.orders.map((id) => {
              return {
                productId: id,
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
          },
        },
      },
    });

    return order;
  };

  public findOne = async (id: number): Promise<CustomerOrder> => {
    const order = await this.prismaService.customerOrder.findUnique({
      where: {
        id,
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
          },
        },
      },
    });

    if (!order) {
      throw new HttpException(
        `Pedido com o id ${id} não existe`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return order;
  };

  public findAll = async (req: IReq): Promise<CustomerOrder[]> => {
    const orders = await this.prismaService.customerOrder.findMany({
      where: {
        establishmentId: req.user.establishmentId,
        AND: {
          status: {
            notIn: ['CONCLUDED', 'FINISHED'],
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
          },
        },
      },
    });

    return orders;
  };

  public delete = async (id: number): Promise<boolean> => {
    await this.findOne(id);

    await this.prismaService.customerOrder.delete({
      where: {
        id,
      },
    });

    return true;
  };

  public update = async (
    id: number,
    updateDto: UpdateCustomerOrderDto,
    req: IReq,
  ) => {
    await this.findOne(id);

    const products = await this.prismaService.product.findMany({
      where: {
        establishmentId: req.user.establishmentId,
        AND: {
          id: {
            in: updateDto.orders,
          },
        },
      },
    });

    if (products.length < updateDto.orders.length) {
      throw new HttpException(
        'Produto(s) com o id(s) especificado não existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    const orderPrice = products.reduce(
      (acc, product) => acc + product.price,
      0,
    );

    await this.prismaService.customerOrder.update({
      where: {
        id,
      },

      data: {
        OrderedProduct: {
          deleteMany: {
            customerOrderId: id,
          },
        },
      },
    });

    return await this.prismaService.customerOrder.update({
      where: {
        id,
      },

      data: {
        customerName: updateDto.customerName,
        comments: updateDto.comments,
        orderPrice,
        establishmentId: req.user.establishmentId,
        OrderedProduct: {
          createMany: {
            data: updateDto.orders.map((id) => {
              return {
                productId: id,
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
          },
        },
      },
    });
  };
}
