import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
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
        Product_Category: {
          createMany: {
            data: categories_id,
          },
        },
      },
    });
    return product;
  };

  public updated = async (
    updateProductRegistrationDto: UpdateProductRegistrationDto,
    id: number,
    req: any,
  ): Promise<ProductRegistration> => {
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

    const categories_id = updateProductRegistrationDto.categories_id.map(
      (id) => {
        return {
          category_id: id,
        };
      },
    );
    const categoriesExitis = await this.prismaService.category.findMany({
      where: {
        id: {
          in: updateProductRegistrationDto.categories_id,
        },
      },
    });

    if (
      categoriesExitis.length <
      updateProductRegistrationDto.categories_id.length
    ) {
      throw new HttpException(
        HelpMessager.category_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProduct = await this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        name: updateProductRegistrationDto.name.toLocaleLowerCase(),
        price: updateProductRegistrationDto.price,
        Product_Category: {
          updateMany: {
            data: categories_id,
            where: {
              product_id: i
              d,
            },
          },
        },
      },
    });

    return newProduct;
  };

  public findAll = async (req: any): Promise<any[]> => {
    const allProducts = await this.prismaService.product.findMany({
      where: {
        user_id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        user_id: true,
        Product_Category: {
          select: {
            category_id: true,
            category: true,
            product_id: false,
          },
        },
      },
    });

    return allProducts;
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

    await this.prismaService.product.delete({
      where: {
        id,
      },
    });

    return true;
  };
}
