import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { PaginationCategroyDto } from '../category/dto/pagination-category';
import { PhotoProductService } from '../photo-product/photo-product.service';
import { CreateProductRegistrationDto } from './dto/create-product-registration.dto';
import { UpdateProductRegistrationDto } from './dto/update-product-registration.dto';
import { ProductRegistration } from './entities/product-registration.entity';
import { IInitialFinalDate } from 'src/interfaces/IDates';
import { ISalesAccount } from './interfaces/ISalesAccount';

@Injectable()
export class ProductRegistrationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly photoProductService: PhotoProductService,
  ) {}

  public create = async (
    createDto: CreateProductRegistrationDto,
    req: IReq,
  ): Promise<ProductRegistration> => {
    const productExists = await this.prismaService.product.findFirst({
      where: {
        name: createDto.name,
        AND: {
          establishmentId: req.user.establishmentId,
        },
      },
    });

    if (productExists) {
      throw new HttpException(
        HelpMessager.productNameExists,
        HttpStatus.BAD_REQUEST,
      );
    }

    const categories = await this.prismaService.category.findMany({
      where: {
        id: {
          in: createDto.categoriesId,
        },
      },
    });

    if (categories.length < createDto.categoriesId.length) {
      throw new HttpException(
        HelpMessager.category_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    const product = await this.prismaService.product.create({
      data: {
        name: createDto.name,
        description: createDto.description,
        establishmentId: req.user.establishmentId,
        price: createDto.price,
        avargePrice: createDto.avargePrice,
        ProductCategory: {
          createMany: {
            data: createDto.categoriesId.map((e) => {
              return {
                categoryId: e,
              };
            }),
          },
        },
      },

      include: {
        ProductCategory: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
        ProductPhoto: true,
      },
    });

    return product;
  };

  public findOne = async (id: number): Promise<ProductRegistration> => {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        avargePrice: true,

        ProductCategory: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },

        ProductPhoto: true,
      },
    });

    if (!product) {
      throw new HttpException(
        HelpMessager.product_not_exits,
        HttpStatus.NO_CONTENT,
      );
    }
    return product;
  };

  public update = async (
    id: number,
    updateDto: UpdateProductRegistrationDto,
    req: IReq,
  ): Promise<ProductRegistration> => {
    const productExists = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new HttpException(
        HelpMessager.product_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    const productNameExists = await this.prismaService.product.findFirst({
      where: {
        name: updateDto.name,
        AND: {
          establishmentId: req.user.establishmentId,
        },
      },
    });

    if (productNameExists && updateDto.name !== productNameExists.name) {
      throw new HttpException(
        `Produto com o nome ${updateDto.name} já cadastrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const categories = await this.prismaService.category.findMany({
      where: {
        id: {
          in: updateDto.categoriesId,
        },
        AND: {
          establishmentId: req.user.establishmentId,
        },
      },
    });

    if (categories.length < updateDto.categoriesId.length) {
      throw new HttpException(
        HelpMessager.category_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prismaService.product.update({
      where: {
        id,
      },

      data: {
        ProductCategory: {
          deleteMany: {
            productId: id,
          },
        },

        ProductIngredient: {
          deleteMany: {
            productId: id,
          },
        },
      },
    });

    return await this.prismaService.product.update({
      where: {
        id,
      },

      data: {
        name: updateDto.name,
        price: updateDto.price,
        description: updateDto.description,
        avargePrice: updateDto.avargePrice,

        ProductCategory: {
          createMany: {
            data: updateDto.categoriesId.map((e) => {
              return {
                categoryId: e,
              };
            }),
          },
        },
      },

      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        avargePrice: true,

        ProductCategory: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },

        ProductPhoto: true,
      },
    });
  };

  public findAll = async (
    pagination: PaginationCategroyDto,
    req: IReq,
  ): Promise<{ quantity: number; dishes: ProductRegistration[] }> => {
    const countProducts = await this.prismaService.product.count({
      where: {
        establishmentId: req.user.establishmentId,
      },
    });

    if (pagination.text) {
      const products = await this.prismaService.product.findMany({
        where: {
          establishmentId: req.user.establishmentId,
          AND: {
            name: {
              contains: pagination.text,
            },
          },
        },

        include: {
          ProductPhoto: {
            select: {
              filename: true,
              url: true,
            },
          },
        },
      });

      return {
        dishes: products,
        quantity: countProducts,
      };
    }

    if (pagination.skip && pagination.take) {
      const products = await this.prismaService.product.findMany({
        where: {
          establishmentId: req.user.establishmentId,
        },

        skip: Number(pagination.skip),
        take: Number(pagination.take),

        include: {
          ProductPhoto: {
            select: {
              filename: true,
              url: true,
            },
          },
        },
      });

      return {
        dishes: products,
        quantity: countProducts,
      };
    }

    const products = await this.prismaService.product.findMany({
      where: {
        establishmentId: req.user.establishmentId,
      },

      include: {
        ProductPhoto: {
          select: {
            filename: true,
            url: true,
          },
        },
      },
    });

    return {
      dishes: products,
      quantity: countProducts,
    };
  };

  public delete = async (id: number): Promise<boolean> => {
    await this.findOne(id);

    const deleted = await this.photoProductService.delete(id);
    if (!deleted) {
      throw new HttpException(
        'Não foi possível exlucir o prato.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prismaService.product.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  };

  public salesAccount = async (
    req: IReq,
    date: IInitialFinalDate,
  ): Promise<ISalesAccount> => {
    let sales;
    if (
      (!date.finalDate && !date.initialDate) ||
      (date.finalDate === 'undefined' && date.initialDate === 'undefined')
    ) {
      sales = await this.prismaService.customerOrder.findMany({
        where: {
          establishmentId: req.user.establishmentId,
        },
      });
    } else {
      sales = await this.prismaService.customerOrder.findMany({
        where: {
          establishmentId: req.user.establishmentId,
          dateOrder: {
            lte: date.finalDate,
            gte: date.initialDate,
          },
        },
      });
    }

    const valueSales = sales.reduce((acc: number, value) => {
      return acc + value.orderPrice;
    }, 0);

    return { valueSales, orders: sales };
  };
}
