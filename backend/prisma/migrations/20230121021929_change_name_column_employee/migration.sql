/*
  Warnings:

  - You are about to drop the column `active` on the `employees` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `employees` DROP COLUMN `active`,
    ADD COLUMN `activeAccount` BOOLEAN NOT NULL DEFAULT true;
