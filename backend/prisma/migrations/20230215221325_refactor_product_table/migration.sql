/*
  Warnings:

  - You are about to drop the column `created_at` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `updeated_at` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `products` table. All the data in the column will be lost.
  - The primary key for the `products_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_id` on the `products_categories` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `products_categories` table. All the data in the column will be lost.
  - Added the required column `establishmentId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `products_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `products_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `products_categories` DROP FOREIGN KEY `products_categories_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `products_categories` DROP FOREIGN KEY `products_categories_product_id_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `created_at`,
    DROP COLUMN `updeated_at`,
    DROP COLUMN `user_id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `establishmentId` INTEGER NOT NULL,
    ADD COLUMN `updeatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `products_categories` DROP PRIMARY KEY,
    DROP COLUMN `category_id`,
    DROP COLUMN `product_id`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `productId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`categoryId`, `productId`);

-- AddForeignKey
ALTER TABLE `products_categories` ADD CONSTRAINT `products_categories_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_categories` ADD CONSTRAINT `products_categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
