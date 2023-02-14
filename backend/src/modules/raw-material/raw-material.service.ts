import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { PaginationCategroyDto } from '../category/dto/pagination-category';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { RawMaterial } from './entities/raw-material.entity';

@Injectable()
export class RawMaterialService {
  constructor(private readonly prismaService: PrismaService) {}

  public create = async (
    data: CreateRawMaterialDto,
    req: IReq,
  ): Promise<RawMaterial> => {
    const rawMaterialExist = await this.prismaService.rawMaterial.findFirst({
      where: {
        name: data.name,
        AND: {
          user_id: req.user.id,
        },
      },
    });

    if (rawMaterialExist) {
      throw new HttpException(
        HelpMessager.rawMaterialExists,
        HttpStatus.BAD_REQUEST,
      );
    }

    const rawMaterial = await this.prismaService.rawMaterial.create({
      data: {
        name: data.name,
        averagePrice: Number(data.price),
        quantityGg: Number(data.quantity),
        averagePriceGg: this.calcPriceGg(data.price, data.quantity),
        user_id: req.user.id,
        measureRegister: data.measureRegister,
      },
    });

    return rawMaterial;
  };

  public findById = async (id: number): Promise<RawMaterial> => {
    const rawMaterial = await this.prismaService.rawMaterial.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!rawMaterial) {
      throw new HttpException(
        HelpMessager.rawMaterialNotExists,
        HttpStatus.BAD_REQUEST,
      );
    }

    return rawMaterial;
  };

  public update = async (
    id: number,
    data: UpdateRawMaterialDto,
  ): Promise<RawMaterial> => {
    const rawMaterial = await this.findById(id);

    if (!rawMaterial) {
      throw new HttpException(
        HelpMessager.rawMaterialNotExists,
        HttpStatus.BAD_REQUEST,
      );
    }
    const newAveragePriceGg =
      (rawMaterial.averagePriceGg +
        this.calcPriceGg(data.price, Math.abs(data.quantity))) /
      2;

    const newRawMaterial = await this.prismaService.rawMaterial.update({
      where: {
        id: Number(id),
      },

      data: {
        name: data.name,
        averagePrice: Number(data.price),
        quantityGg: Number(data.quantity) + Number(rawMaterial.quantityGg),
        averagePriceGg: data.isAddedProduct
          ? rawMaterial.averagePriceGg
          : newAveragePriceGg,
        measureRegister: data.measureRegister,
      },
    });

    return newRawMaterial;
  };

  public delete = async (id: number): Promise<boolean> => {
    const rawMaterialExist = await this.findById(id);

    if (!rawMaterialExist) {
      throw new HttpException(
        HelpMessager.rawMaterialNotExists,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prismaService.rawMaterial.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  };

  public findAll = async (req: IReq, params: PaginationCategroyDto) => {
    let allRawMaterial;
    if (params.text) {
      // let rawMaterialByText;
      //Caso o usuário tenha funcionários cadastrados e tenha passado o parametro (texto).
      // if (employees.length) {
      //   rawMaterialByText = await this.prismaService.rawMaterial.findMany({
      //     where: {
      //       user_id: req.user.id,
      //       OR: {
      //         user_id: {
      //           in: employees.map((e) => e.id),
      //         },
      //       },

      //       AND: {
      //         name: {
      //           contains: params.text,
      //         },
      //       },
      //     },
      //     take: Number(params.take),
      //     skip: Number(params.skip),
      //   });
      // }
      //Caso o usuário NÃO tenha funcionários cadastrados e tenha passado o parametro de (texto);
      const rawMaterialByText = await this.prismaService.rawMaterial.findMany({
        where: {
          user_id: req.user.id,

          AND: {
            name: {
              contains: params.text,
            },
          },
        },
        take: Number(params.take),
        skip: Number(params.skip),
      });

      return { rawMaterial: rawMaterialByText, count: 0 };
    }

    const countProducts = await this.prismaService.rawMaterial.aggregate({
      where: {
        user_id: req.user.id,
      },

      _count: {
        user_id: true,
      },
    });

    if (params.skip && params.take) {
      //Caso o usuário tenha funcionários cadastrados e tenha passado dois parametros (take, skip).
      // if (employees.length) {
      //   allRawMaterial = await this.prismaService.rawMaterial.findMany({
      //     where: {
      //       user_id: req.user.id,
      //       OR: {
      //         user_id: {
      //           in: employees.map((e) => e.id),
      //         },
      //       },
      //     },
      //     take: Number(params.take),
      //     skip: Number(params.skip),
      //   });
      // }
      //Caso o usuário NÃO tenha funcionários cadastrados e tenha passado dois parametros (take, skip).
      allRawMaterial = await this.prismaService.rawMaterial.findMany({
        where: {
          user_id: req.user.id,
        },

        take: Number(params.take),
        skip: Number(params.skip),
      });

      return {
        rawMaterial: allRawMaterial,
        count: countProducts._count.user_id,
      };
    } else {
      //Caso o usuário tenha funcionários cadastrados e NÃO tenha passado nenhum parametro (texto, take, skip).
      // if (employees.length) {
      //   allRawMaterial = await this.prismaService.rawMaterial.findMany({
      //     where: {
      //       user_id: req.user.id,
      //       OR: {
      //         user_id: {
      //           in: employees.map((e) => e.id),
      //         },
      //       },
      //     },
      //   });
      // }
      //Caso o usuário NÃO  tenha funcionários cadastrados e NÃO tenha passado nenhum parametro (texto, take, skip).
      allRawMaterial = await this.prismaService.rawMaterial.findMany({
        where: {
          user_id: req.user.id,
        },
      });

      return {
        rawMaterial: allRawMaterial,
        count: countProducts._count.user_id,
      };
    }
  };

  private calcPriceGg = (price: number, qtd: number): number => {
    return (price * 100) / qtd;
  };
}
