/*
  Warnings:

  - A unique constraint covering the columns `[employeePhotoId]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeePhotoId` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employees` ADD COLUMN `employeePhotoId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `employees_photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `originalname` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updeated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `employees_employeePhotoId_key` ON `employees`(`employeePhotoId`);

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_employeePhotoId_fkey` FOREIGN KEY (`employeePhotoId`) REFERENCES `employees_photo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
