/*
  Warnings:

  - Added the required column `acess_screens` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employees` ADD COLUMN `acess_screens` VARCHAR(191) NOT NULL;
