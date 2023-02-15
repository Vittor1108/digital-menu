import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
}
