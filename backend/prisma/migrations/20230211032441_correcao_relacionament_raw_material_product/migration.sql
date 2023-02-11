/*
  Warnings:

  - You are about to drop the `_producttorawmaterial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_producttorawmaterial` DROP FOREIGN KEY `_ProductToRawMaterial_A_fkey`;

-- DropForeignKey
ALTER TABLE `_producttorawmaterial` DROP FOREIGN KEY `_ProductToRawMaterial_B_fkey`;

-- DropTable
DROP TABLE `_producttorawmaterial`;

-- CreateTable
CREATE TABLE `ProductIngredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Qtd` DOUBLE NOT NULL,
    `productId` INTEGER NOT NULL,
    `rawMaterialId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductIngredient` ADD CONSTRAINT `ProductIngredient_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductIngredient` ADD CONSTRAINT `ProductIngredient_rawMaterialId_fkey` FOREIGN KEY (`rawMaterialId`) REFERENCES `raw_material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
