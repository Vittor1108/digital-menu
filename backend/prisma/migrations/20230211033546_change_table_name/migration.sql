/*
  Warnings:

  - You are about to drop the column `Qtd` on the `productingredient` table. All the data in the column will be lost.
  - Added the required column `qtd` to the `ProductIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productingredient` DROP COLUMN `Qtd`,
    ADD COLUMN `qtd` DOUBLE NOT NULL;
