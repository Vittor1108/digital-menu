/*
  Warnings:

  - Added the required column `surname` to the `Screens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `screens` ADD COLUMN `surname` VARCHAR(191) NOT NULL;
