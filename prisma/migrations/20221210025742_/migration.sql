/*
  Warnings:

  - The primary key for the `products_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `products_categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products_categories` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`category_id`, `product_id`);
