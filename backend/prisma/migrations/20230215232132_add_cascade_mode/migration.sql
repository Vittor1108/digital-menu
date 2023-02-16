-- DropForeignKey
ALTER TABLE `productingredient` DROP FOREIGN KEY `ProductIngredient_productId_fkey`;

-- DropForeignKey
ALTER TABLE `productingredient` DROP FOREIGN KEY `ProductIngredient_rawMaterialId_fkey`;

-- AddForeignKey
ALTER TABLE `ProductIngredient` ADD CONSTRAINT `ProductIngredient_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductIngredient` ADD CONSTRAINT `ProductIngredient_rawMaterialId_fkey` FOREIGN KEY (`rawMaterialId`) REFERENCES `raw_material`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
