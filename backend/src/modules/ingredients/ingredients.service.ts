import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';
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

  private calcPriceG = (qtd: number, price: number): number => {
    return (100 * price) / qtd;
  };
}

// {
// 	"id": 2,
// 	"name": "Arroz",
// 	"quantityGg": 5000,
// 	"averagePrice": 31.5,
// 	"averagePriceGg": 0.63,
// 	"measureRegister": 1,
// 	"user_id": 1
// }
