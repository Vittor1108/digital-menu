import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { ProductRegistrationService } from '../product/product-registration.service';
import { CreateCustomerOrderDto } from './dto/create-customer-order.dto';
import { UpdateCustomerOrderDto } from './dto/update-customer-order.dto';
import { CustomerOrder } from './entities/customer-order.entity';
import { IOrder } from './interfaces/IOrders';

@Injectable()
export class CustomerOrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productService: ProductRegistrationService,
  ) {}

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

  public getRecentOrderes = async (
    req: IReq,
    qtd: number,
  ): Promise<CustomerOrder[]> => {
    const recentOrders = await this.prismaService.customerOrder.findMany({
      where: {
        establishmentId: req.user.establishmentId,
      },
      orderBy: [
        {
          id: 'desc',
        },
      ],
      take: Number(qtd),
    });

    return recentOrders;
  };

  public moreOrders = async (req: IReq): Promise<IOrder[]> => {
    const { dishes } = await this.productService.findAll(
      { skip: '', take: '', text: '' },
      req,
    );
    const dishesId = dishes.map((e) => e.id);

    const requests = await this.prismaService.orderedProduct.findMany({
      where: {
        productId: {
          in: dishesId,
        },
      },
    });

    const moreSells: { productId: number; quantity: number }[] =
      requests.reduce((acc, object) => {
        const objectExists = acc.find(
          (item) => item.productId === object.productId,
        );

        objectExists
          ? (objectExists.quantity += object.quantity)
          : acc.push({
              productId: object.productId,
              quantity: object.quantity,
            });

        return acc;
      }, []);

    const final = await Promise.all(
      moreSells.map(async (e) => {
        const product = await this.prismaService.product.findUnique({
          where: {
            id: e.productId,
          },

          select: {
            name: true,
            price: true,
            ProductPhoto: {
              select: {
                url: true,
              },
            },
          },
        });

        return {
          product,
          sellsQuantity: e.quantity,
          income: e.quantity * product.price,
        };
      }),
    );

    return final;
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
