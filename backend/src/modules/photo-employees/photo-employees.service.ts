import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';
import { removeFile } from 'src/utils/file-upload.utils';

@Injectable()
export class PhotoEmployeesService {
  private baseURL = 'http://localhost:3000/assets/uploads/images';
  constructor(private readonly prismaService: PrismaService) {}

  public create = async (
    file: Express.Multer.File,
    id: number,
  ): Promise<boolean> => {
    const userExists = await this.prismaService.employee.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!userExists) {
      removeFile(file.filename);
      throw new HttpException(
        HelpMessager.employees_not_exists,
        HttpStatus.BAD_REQUEST,
      );
    }

    const userHasPhoto = await this.prismaService.employeePhoto.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (userHasPhoto) {
      removeFile(file.filename);
      throw new HttpException(
        HelpMessager.employee_has_photo,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prismaService.employeePhoto.create({
      data: {
        filename: file.filename,
        originalname: file.originalname,
        employee_id: Number(id),
        url: `${this.baseURL}/${file.filename}`,
      },
    });

    return true;
  };

  public deleteFile = async (id: number): Promise<boolean> => {
    const file = await this.prismaService.employeePhoto.findFirst({
      where: {
        employee_id: Number(id),
      },
    });

    if (!file) {
      throw new HttpException(
        HelpMessager.employee_has_photo,
        HttpStatus.BAD_REQUEST,
      );
    }

    removeFile(file.filename);
    await this.prismaService.employeePhoto.deleteMany({
      where: {
        employee_id: Number(id),
      },
    });

    return true;
  };
}
