import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService, PrismaService],
})
export class IngredientslModule {}
