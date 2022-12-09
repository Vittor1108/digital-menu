import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { CreateCategoryDto } from './dto/create-category.dto';
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
        name: data.name,
        user_id: req.user.id,
      },
    });

    return category;
  };

  public updated = async (data: UpdateCategoryDto, id: number, req: any) => {
    const categoryExistis = await this.prismaService.category.findFirst({
      where: {
        id,
      },
    });

    if (!categoryExistis) {
      throw new HttpException(
        HelpMessager.category_exits,
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
        name: data.name,
        updeated_at: new Date(),
      },
    });

    return newCategory;
  };
}
