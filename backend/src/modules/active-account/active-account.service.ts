import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { HelpMessager } from 'src/helper/messageHelper';

@Injectable()
export class ActiveAccountService {
  constructor(private readonly prismaService: PrismaService) {}

  public checkTokenActiveAccount = async (
    tokenActiveAccount: string,
  ): Promise<boolean> => {
    const user = await this.prismaService.establishment.findUnique({
      where: {
        tokenActiveAccount,
      },
    });

    if (!user) {
      throw new HttpException(
        HelpMessager.userNotFoundToken,
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.prismaService.establishment.update({
      where: {
        tokenActiveAccount,
      },
      data: {
        activeAccount: true,
        updeated_at: new Date(),
      },
    });

    return true;
  };
}
