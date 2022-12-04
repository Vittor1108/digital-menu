/*
  Warnings:

  - Made the column `tokenActiveAccount` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `tokenActiveAccount` VARCHAR(191) NOT NULL;
