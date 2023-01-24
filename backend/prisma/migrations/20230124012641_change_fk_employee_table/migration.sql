/*
  Warnings:

  - You are about to drop the column `employeeId` on the `employees_photo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `employees_photo` DROP FOREIGN KEY `employees_photo_employeeId_fkey`;

-- AlterTable
ALTER TABLE `employees_photo` DROP COLUMN `employeeId`;

-- AddForeignKey
ALTER TABLE `employees_photo` ADD CONSTRAINT `employees_photo_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
