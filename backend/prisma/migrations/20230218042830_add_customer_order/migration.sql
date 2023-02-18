-- CreateTable
CREATE TABLE `customer_order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerName` VARCHAR(191) NOT NULL,
    `comments` VARCHAR(191) NULL,
    `status` ENUM('RECEIVED', 'PREPARATION', 'FINISHED', 'CONCLUDED') NOT NULL DEFAULT 'RECEIVED',
    `establishmentId` INTEGER NOT NULL,
    `orderPrice` DOUBLE NOT NULL,
    `dateOrder` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
