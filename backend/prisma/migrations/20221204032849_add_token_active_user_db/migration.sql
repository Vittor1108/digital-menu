/*
  Warnings:

  - A unique constraint covering the columns `[tokenActiveAccount]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `activeAccount` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tokenActiveAccount` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_tokenActiveAccount_key` ON `users`(`tokenActiveAccount`);
