-- AlterTable
ALTER TABLE `products` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updeated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
