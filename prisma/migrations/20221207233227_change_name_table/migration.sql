/*
  Warnings:

  - You are about to drop the `photo_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `photo_user` DROP FOREIGN KEY `photo_user_user_id_fkey`;

-- DropTable
DROP TABLE `photo_user`;

-- CreateTable
CREATE TABLE `photo_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `originalname` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `photo_users` ADD CONSTRAINT `photo_users_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
