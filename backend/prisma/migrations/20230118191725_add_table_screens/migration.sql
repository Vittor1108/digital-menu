/*
  Warnings:

  - You are about to drop the column `acess_screens` on the `employees` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `employees` DROP COLUMN `acess_screens`;

-- CreateTable
CREATE TABLE `screens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
