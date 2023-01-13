import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { removeFile } from 'src/utils/file-upload.utils';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginationCategroyDto } from './dto/pagination-category';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  public create = async (
    data: CreateCategoryDto,
    req: any,
  ): Promise<Category> => {
    const categoryExistis = await this.prismaService.category.findFirst({
      where: {
        user_id: req.user.id,
        name: data.name,
      },
    });

    if (categoryExistis) {
      throw new HttpException(
        HelpMessager.category_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    const category = await this.prismaService.category.create({
      data: {
        name: data.name.toLowerCase(),
        description: data.description.toLocaleLowerCase(),
        user_id: req.user.id,
      },
    });

    return category;
  };

  public updated = async (
    data: UpdateCategoryDto,
    id: number,
    req: any,
  ): Promise<Category> => {
    const categoryExistis = await this.prismaService.category.findFirst({
      where: {
        id,
      },
    });

    if (!categoryExistis) {
      throw new HttpException(
        HelpMessager.category_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    const category = await this.prismaService.category.findFirst({
      where: {
        id: id,
      },
    });

    if (Number(category.user_id) !== Number(req.user.id)) {
      throw new HttpException(
        HelpMessager.category_doNot_user,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const newCategory = await this.prismaService.category.update({
      where: {
        id,
      },

      data: {
        name: data.name.toLocaleLowerCase(),
        description: data.description.toLocaleLowerCase(),
        updeated_at: new Date(),
      },
    });

    return newCategory;
  };

  public findAll = async (
    req: any,
    params: PaginationCategroyDto,
  ): Promise<Category[]> => {
    if (params.text) {
      const categoriesByText = await this.prismaService.category.findMany({
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

        select: {
          id: true,
          name: true,
          description: true,
          PhotoCategory: {
            select: {
              filename: true,
              url: true,
            },
          },
        },
      });

      return categoriesByText;
    }

    const allCategories = await this.prismaService.category.findMany({
      where: {
        user_id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        PhotoCategory: {
          select: {
            filename: true,
            url: true,
          },
        },
      },

      take: Number(params.take),
      skip: Number(params.skip),
    });

    return allCategories;
  };

  public delete = async (id: number, req: any): Promise<boolean> => {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new HttpException(
        HelpMessager.category_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (Number(category.user_id) !== Number(req.user.id)) {
      throw new HttpException(
        HelpMessager.category_doNot_user,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const photos = await this.prismaService.photoCategory.findMany({
      where: {
        category_id: id,
      },
    });

    if (!photos) {
      throw new HttpException(
        HelpMessager.photo_not_found,
        HttpStatus.BAD_REQUEST,
      );
    }

    photos.forEach((photo) => {
      removeFile(photo.filename);
    });

    await this.prismaService.photoCategory.deleteMany({
      where: {
        category_id: id,
      },
    });

    await this.prismaService.category.delete({
      where: {
        id,
      },
    });

    return true;
  };

  public findOne = async (id: number): Promise<Category> => {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        PhotoCategory: {
          select: {
            id: true,
            filename: true,
            originalname: true,
            url: true,
          },
        },
      },
    });

    if (!category) {
      throw new HttpException(
        HelpMessager.category_not_exits,
        HttpStatus.BAD_REQUEST,
      );
    }

    return category;
  };
}
