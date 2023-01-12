import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { removeFile } from 'src/utils/file-upload.utils';
import { CreateProductRegistrationDto } from './dto/create-product-registration.dto';
import { UpdateProductRegistrationDto } from './dto/update-product-registration.dto';
import { ProductRegistration } from './entities/product-registration.entity';

@Injectable()
export class ProductRegistrationService {
  constructor(private readonly prismaService: PrismaService) {}

  public create = async (
    createProductRegistrationDto: CreateProductRegistrationDto,
    req: any,
  ): Promise<ProductRegistration> => {
    const productExistis = await this.prismaService.product.findFirst({
      where: {
        name: createProductRegistrationDto.name.toLocaleLowerCase(),
        user_id: req.user.id,
      },
    });

    if (productExistis) {
      throw new HttpException(
        HelpMessager.product_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    const categories_id = createProductRegistrationDto.categories_id.map(
      (id) => {
        return {
          category_id: id,
        };
      },
    );

    const categoriesExitis = await this.prismaService.category.findMany({
      where: {
        id: {
          in: createProductRegistrationDto.categories_id,
        },
      },
    });

    if (
      categoriesExitis.length <
      createProductRegistrationDto.categories_id.length
    ) {
      throw new HttpException(
        HelpMessager.category_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    const product = await this.prismaService.product.create({
      data: {
        name: createProductRegistrationDto.name.toLocaleLowerCase(),
        price: createProductRegistrationDto.price,
        user_id: req.user.id,
        description: createProductRegistrationDto.description,
        Product_Category: {
          createMany: {
            data: categories_id,
          },
        },
      },

      select: {
        id: true,
        name: true,
        price: true,
        description: true,
      },
    });
    return product;
  };

  public updated = async (
    updateProductRegistrationDto: UpdateProductRegistrationDto,
    id: number,
    req: any,
  ): Promise<any> => {
    const productExistis = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExistis) {
      throw new HttpException(
        HelpMessager.product_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (Number(productExistis.user_id) !== Number(req.user.id)) {
      throw new HttpException(
        HelpMessager.product_doNot_user,
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.prismaService.product.update({
      where: {
        id,
      },

      data: {
        Product_Category: {
          deleteMany: {
            product_id: id,
          },
        },
      },

      select: {
        Product_Category: true,
      },
    });

    const newProduct = await this.prismaService.product.update({
      where: {
        id,
      },

      data: {
        name: updateProductRegistrationDto.name,
        description: updateProductRegistrationDto.description,
        price: updateProductRegistrationDto.price,
        Product_Category: {
          connectOrCreate: updateProductRegistrationDto.categories_id.map(
            (category) => {
              return {
                where: {
                  category_id_product_id: {
                    category_id: category,
                    product_id: id,
                  },
                },

                create: {
                  category_id: category,
                },
              };
            },
          ),
        },
      },

      include: {
        Product_Category: true,
        ProductPhoto: true,
      },
    });

    return newProduct;
  };

  public findAll = async (req: any): Promise<ProductRegistration[]> => {
    const allProducts = await this.prismaService.product.findMany({
      where: {
        user_id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        Product_Category: {
          select: {
            category_id: true,
            category: {
              select: {
                name: true,
              },
            },
            product_id: false,
          },
        },
        ProductPhoto: {
          select: {
            url: true,
            filename: true,
          },
        },
      },
    });

    return allProducts;
  };

  public findOne = async (id: number): Promise<ProductRegistration> => {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        price: true,
        description: true,
        ProductPhoto: {
          select: {
            id: true,
            url: true,
            filename: true,
            originalname: true,
          },
        },
        Product_Category: {
          select: {
            category_id: true,
            category: {
              select: {
                name: true,
              },
            },
            product_id: false,
          },
        },
      },
    });

    if (!product) {
      throw new HttpException(
        HelpMessager.product_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    return product;
  };

  public delete = async (id: number, req: any): Promise<boolean> => {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new HttpException(
        HelpMessager.product_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (Number(product.user_id) !== Number(req.user.id)) {
      throw new HttpException(
        HelpMessager.product_doNot_user,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const photos = await this.prismaService.productPhoto.findMany({
      where: {
        product_id: id,
      },
    });

    photos.forEach((photo) => {
      removeFile(photo.filename);
    });

    await this.prismaService.productPhoto.deleteMany({
      where: {
        product_id: id,
      },
    });

    await this.prismaService.product.delete({
      where: {
        id,
      },
    });

    return true;
  };
}
