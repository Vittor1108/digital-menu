import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { PaginationCategroyDto } from '../category/dto/pagination-category';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';
import { UpdateIngredientsDto } from './dto/update-ingredients.dto';
import { Ingredients } from './entities/ingredients.entity';

@Injectable()
export class IngredientsService {
  constructor(private readonly prismaService: PrismaService) {}

  public create = async (
    req: IReq,
    createDto: CreateIngredientsDto,
  ): Promise<Ingredients> => {
    const ingredientsNameExists =
      await this.prismaService.ingredients.findFirst({
        where: {
          name: createDto.name,
          AND: {
            establishmentId: req.user.establishmentId,
          },
        },
      });

    if (ingredientsNameExists) {
      throw new HttpException(
        `Ingredinete com o nome ${createDto.name} já existe`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prismaService.ingredients.create({
      data: {
        name: createDto.name,
        quantityGg: createDto.quantity,
        measureRegister: createDto.measureRegister,
        establishmentId: req.user.id,
        averagePrice: createDto.price,
        averagePriceGg: this.calcPriceG(createDto.quantity, createDto.price),
      },
    });
  };

  public findOne = async (id: number): Promise<Ingredients> => {
    const ingredient = await this.prismaService.ingredients.findUnique({
      where: {
        id,
      },
    });

    if (!ingredient) {
      throw new HttpException(
        `Ingrediente com o id ${id} não existe`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return ingredient;
  };

  public findAll = async (
    pagination: PaginationCategroyDto,
    req: IReq,
  ): Promise<{ count: number; ingredients: Ingredients[] }> => {
    const object = {
      count: await this.prismaService.ingredients.count({
        where: {
          establishmentId: req.user.establishmentId,
        },
      }),
      ingredients: [],
    };
    if (pagination.text) {
      object.ingredients = await this.prismaService.ingredients.findMany({
        where: {
          establishmentId: req.user.establishmentId,
          AND: {
            name: {
              contains: pagination.text,
            },
          },
        },
      });
    }

    if (pagination.skip && pagination.take) {
      object.ingredients = await this.prismaService.ingredients.findMany({
        where: {
          establishmentId: req.user.establishmentId,
        },

        take: Number(pagination.take),
        skip: Number(pagination.skip),
      });
    }

    if (!pagination.skip && !pagination.take && !pagination.text) {
      object.ingredients = await this.prismaService.ingredients.findMany({
        where: {
          establishmentId: req.user.establishmentId,
        },
      });
    }

    return object;
  };

  public delete = async (id: number): Promise<boolean> => {
    await this.findOne(id);

    await this.prismaService.ingredients.delete({
      where: {
        id,
      },
    });

    return true;
  };

  public update = async (
    id: number,
    updateDto: UpdateIngredientsDto,
    req: IReq,
  ) => {
    const ingredientExists = await this.findOne(id);
    const ingredientsNameExists =
      await this.prismaService.ingredients.findFirst({
        where: {
          name: updateDto.name,
          AND: {
            establishmentId: req.user.establishmentId,
          },
        },
      });

    if (
      ingredientsNameExists &&
      updateDto.name !== ingredientsNameExists.name
    ) {
      throw new HttpException(
        `Ingrediente com o nome ${updateDto.name} já cadastrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prismaService.ingredients.update({
      where: {
        id,
      },

      data: {
        name: updateDto.name,
        establishmentId: req.user.establishmentId,
        averagePrice: (ingredientExists.averagePrice + updateDto.price) / 2,
        quantityGg:
          Number(updateDto.quantity) + Number(ingredientExists.quantityGg),
        measureRegister: updateDto.measureRegister,
        averagePriceGg:
          (this.calcPriceG(updateDto.quantity, updateDto.price) +
            ingredientExists.averagePriceGg) /
          2,
      },
    });
  };

  private calcPriceG = (qtd: number, price: number): number => {
    return (100 * price) / qtd;
  };
}
