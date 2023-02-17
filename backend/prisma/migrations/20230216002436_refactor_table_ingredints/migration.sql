/*
  Warnings:

  - You are about to drop the column `rawMaterialId` on the `productingredient` table. All the data in the column will be lost.
  - You are about to drop the `raw_material` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingredientId` to the `ProductIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `productingredient` DROP FOREIGN KEY `ProductIngredient_rawMaterialId_fkey`;

-- AlterTable
ALTER TABLE `productingredient` DROP COLUMN `rawMaterialId`,
    ADD COLUMN `ingredientId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `raw_material`;

-- CreateTable
CREATE TABLE `ingredients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `quantityGg` DOUBLE NOT NULL,
    `averagePrice` DOUBLE NOT NULL,
    `averagePriceGg` DOUBLE NOT NULL,
    `measureRegister` INTEGER NOT NULL,
    `establishmentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductIngredient` ADD CONSTRAINT `ProductIngredient_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `ingredients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
