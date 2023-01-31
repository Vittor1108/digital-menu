-- CreateTable
CREATE TABLE `_ProductToRawMaterial` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductToRawMaterial_AB_unique`(`A`, `B`),
    INDEX `_ProductToRawMaterial_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductToRawMaterial` ADD CONSTRAINT `_ProductToRawMaterial_A_fkey` FOREIGN KEY (`A`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToRawMaterial` ADD CONSTRAINT `_ProductToRawMaterial_B_fkey` FOREIGN KEY (`B`) REFERENCES `raw_material`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
