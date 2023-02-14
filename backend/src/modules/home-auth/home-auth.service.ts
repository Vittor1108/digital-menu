import { Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
@Injectable()
export class HomeAuthService {
  constructor(private readonly prismaService: PrismaService) {}

  public findUser = async (req: IReq) => {
    const user = await this.prismaService.establishment.findUnique({
      where: {
        email: req.user.email,
      },
    });

    const employee = await this.prismaService.employee.findFirst({
      where: {
        email: req.user.email,
      },

      include: {
        screeens: true,
      },
    });

    return !user ? employee : user;
  };
}
