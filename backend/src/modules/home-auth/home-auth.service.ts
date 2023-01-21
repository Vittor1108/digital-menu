import { Injectable } from '@nestjs/common';
import { IReq } from 'src/@types/req';
import { PrismaService } from 'src/database/PrismaService';
@Injectable()
export class HomeAuthService {
  constructor(private readonly prismaService: PrismaService) {}

  public findUser = async (req: IReq) => {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: req.user.email,
      },
    });

    console.log(user);
    return 'Ok';
  };
}
