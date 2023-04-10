/*
  Warnings:

  - Added the required column `quantity` to the `ordered_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ordered_product` ADD COLUMN `quantity` INTEGER NOT NULL;
