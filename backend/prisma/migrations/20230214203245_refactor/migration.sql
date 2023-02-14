/*
  Warnings:

  - You are about to drop the `photo_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `photo_users` DROP FOREIGN KEY `photo_users_user_id_fkey`;

-- DropTable
DROP TABLE `photo_users`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `Establishment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `cpf_cnpj` VARCHAR(191) NOT NULL,
    `tokenActiveAccount` VARCHAR(191) NOT NULL,
    `tokenForgotPassword` VARCHAR(191) NULL,
    `activeAccount` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updeated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Establishment_email_key`(`email`),
    UNIQUE INDEX `Establishment_cpf_cnpj_key`(`cpf_cnpj`),
    UNIQUE INDEX `Establishment_tokenActiveAccount_key`(`tokenActiveAccount`),
    UNIQUE INDEX `Establishment_tokenForgotPassword_key`(`tokenForgotPassword`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
