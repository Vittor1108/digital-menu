/*
  Warnings:

  - You are about to drop the column `login` on the `employees` table. All the data in the column will be lost.
  - Added the required column `email` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employees` DROP COLUMN `login`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;
