/*
  Warnings:

  - You are about to drop the `raw-material` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `raw-material`;

-- CreateTable
CREATE TABLE `raw_material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `price` DOUBLE NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
