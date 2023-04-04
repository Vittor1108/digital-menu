import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginationCategroyDto } from './dto/pagination-category';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { PhotoCategoryService } from '../photo-category/photo-category.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly photoCategoryService: PhotoCategoryService,
  ) {}

  public findOne = async (id: number): Promise<Category> => {
    const categorie = await this.prismaService.category.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        name: true,
        description: true,
        PhotoCategory: true,
      },
    });

    if (!categorie) {
      throw new HttpException(
        HelpMessager.category_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    return categorie;
  };

  public create = async (
    createDto: CreateCategoryDto,
    req: IReq,
  ): Promise<Category> => {
    const categorieExist = await this.prismaService.category.findFirst({
      where: {
        name: createDto.name,
        AND: {
          establishmentId: req.user.establishmentId,
        },
      },
    });

    if (categorieExist) {
      throw new HttpException(
        `Categoria com o nome ${createDto.name} já existe.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prismaService.category.create({
      data: {
        name: createDto.name,
        description: createDto.description,
        establishmentId: req.user.establishmentId,
      },
    });
  };

  public delete = async (id: number): Promise<boolean> => {
    await this.findOne(id);
    const fileDeleted = await this.photoCategoryService.deleteFile(id);

    if (!fileDeleted) {
      throw new HttpException(
        'Não foi possível excluir a categoria',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prismaService.category.delete({
      where: {
        id,
      },
    });

    return true;
  };

  public findAll = async (
    pagination: PaginationCategroyDto,
    req: IReq,
  ): Promise<Category[]> => {
    if (pagination.text) {
      return await this.prismaService.category.findMany({
        where: {
          name: {
            contains: pagination.text,
          },

          AND: {
            establishmentId: req.user.establishmentId,
          },
        },

        include: {
          PhotoCategory: {
            select: {
              url: true,
            },
          },
        },
      });
    }

    if (pagination.take && pagination.skip) {
      return await this.prismaService.category.findMany({
        where: {
          establishmentId: req.user.establishmentId,
        },

        take: Number(pagination.take),
        skip: Number(pagination.skip),
      });
    }

    return await this.prismaService.category.findMany({
      where: {
        establishmentId: req.user.establishmentId,
      },

      include: {
        PhotoCategory: {
          select: {
            url: true,
          },
        },
      },
    });
  };

  public update = async (
    id: number,
    updateDto: UpdateCategoryDto,
    req: IReq,
  ): Promise<Category> => {
    await this.findOne(id);

    const categorieExist = await this.prismaService.category.findFirst({
      where: {
        name: updateDto.name,
        AND: {
          establishmentId: req.user.establishmentId,
        },
      },
    });

    if (categorieExist && updateDto.name === categorieExist.name) {
      throw new HttpException(
        `Categoria com o nome ${updateDto.name} já existe.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prismaService.category.update({
      data: {
        name: updateDto.name,
        description: updateDto.description,
      },

      where: {
        id,
      },
    });
  };
}
