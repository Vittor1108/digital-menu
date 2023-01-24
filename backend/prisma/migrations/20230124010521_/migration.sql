/*
  Warnings:

  - You are about to drop the column `employeePhotoId` on the `employees` table. All the data in the column will be lost.
  - Added the required column `employeeId` to the `employees_photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `employees_photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `employees` DROP FOREIGN KEY `employees_employeePhotoId_fkey`;

-- AlterTable
ALTER TABLE `employees` DROP COLUMN `employeePhotoId`;

-- AlterTable
ALTER TABLE `employees_photo` ADD COLUMN `employeeId` INTEGER NOT NULL,
    ADD COLUMN `employee_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `employees_photo` ADD CONSTRAINT `employees_photo_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
