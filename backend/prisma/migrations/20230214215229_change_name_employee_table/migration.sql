/*
  Warnings:

  - You are about to drop the column `admission_date` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `resignation_date` on the `employees` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[login]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `employees_email_key` ON `employees`;

-- AlterTable
ALTER TABLE `employees` DROP COLUMN `admission_date`,
    DROP COLUMN `email`,
    DROP COLUMN `resignation_date`,
    ADD COLUMN `admissionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `login` VARCHAR(191) NOT NULL,
    ADD COLUMN `resignationDate` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `employees_login_key` ON `employees`(`login`);
