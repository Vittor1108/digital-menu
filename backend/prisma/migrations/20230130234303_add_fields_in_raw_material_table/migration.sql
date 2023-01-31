/*
  Warnings:

  - You are about to drop the column `price` on the `raw_material` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `raw_material` table. All the data in the column will be lost.
  - Added the required column `averagePrice` to the `raw_material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averagePriceGg` to the `raw_material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityGg` to the `raw_material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `raw_material` DROP COLUMN `price`,
    DROP COLUMN `quantity`,
    ADD COLUMN `averagePrice` DOUBLE NOT NULL,
    ADD COLUMN `averagePriceGg` DOUBLE NOT NULL,
    ADD COLUMN `quantityGg` DOUBLE NOT NULL;
