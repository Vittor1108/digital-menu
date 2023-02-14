/*
  Warnings:

  - You are about to drop the column `created_at` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updeated_at` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `cpf_cnpj` on the `establishment` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `establishment` table. All the data in the column will be lost.
  - You are about to drop the column `updeated_at` on the `establishment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpfCnpj]` on the table `Establishment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `establishmentId` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpfCnpj` to the `Establishment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Establishment_cpf_cnpj_key` ON `establishment`;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `created_at`,
    DROP COLUMN `updeated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updeatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `employees` DROP COLUMN `user_id`,
    ADD COLUMN `establishmentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `establishment` DROP COLUMN `cpf_cnpj`,
    DROP COLUMN `created_at`,
    DROP COLUMN `updeated_at`,
    ADD COLUMN `cpfCnpj` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updeatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `Establishment_cpfCnpj_key` ON `Establishment`(`cpfCnpj`);
