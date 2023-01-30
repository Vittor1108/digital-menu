/*
  Warnings:

  - You are about to drop the column `quantidade` on the `raw-material` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `raw-material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `raw-material` DROP COLUMN `quantidade`,
    ADD COLUMN `quantity` DOUBLE NOT NULL;
