-- CreateTable
CREATE TABLE `Establishment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `cpfCnpj` VARCHAR(191) NOT NULL,
    `tokenActiveAccount` VARCHAR(191) NOT NULL,
    `tokenForgotPassword` VARCHAR(191) NULL,
    `activeAccount` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updeatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Establishment_email_key`(`email`),
    UNIQUE INDEX `Establishment_cpfCnpj_key`(`cpfCnpj`),
    UNIQUE INDEX `Establishment_tokenActiveAccount_key`(`tokenActiveAccount`),
    UNIQUE INDEX `Establishment_tokenForgotPassword_key`(`tokenForgotPassword`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `establishmentId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updeatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photo_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `originalname` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updeated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `avargePrice` DOUBLE NULL,
    `establishmentId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updeatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `ordered_product` (
    `customerOrderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updeatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`productId`, `customerOrderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products_categories` (
    `productId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updeated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`categoryId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductIngredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qtd` DOUBLE NOT NULL,
    `productId` INTEGER NOT NULL,
    `ingredientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `quantityGg` DOUBLE NOT NULL,
    `averagePrice` DOUBLE NOT NULL,
    `averagePriceGg` DOUBLE NOT NULL,
    `measureRegister` ENUM('GRAMAS', 'QUILOS', 'MILIGRAMAS') NOT NULL,
    `establishmentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photo_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `originalname` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updeated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `activeAccount` BOOLEAN NOT NULL DEFAULT true,
    `establishmentId` INTEGER NOT NULL,
    `admissionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resignationDate` DATETIME(3) NULL,

    UNIQUE INDEX `employees_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employees_photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `originalname` VARCHAR(191) NOT NULL,
    `employee_id` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updeated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Screens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmployeeToScreens` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmployeeToScreens_AB_unique`(`A`, `B`),
    INDEX `_EmployeeToScreens_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `photo_categories` ADD CONSTRAINT `photo_categories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordered_product` ADD CONSTRAINT `ordered_product_customerOrderId_fkey` FOREIGN KEY (`customerOrderId`) REFERENCES `customer_order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordered_product` ADD CONSTRAINT `ordered_product_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_categories` ADD CONSTRAINT `products_categories_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_categories` ADD CONSTRAINT `products_categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductIngredient` ADD CONSTRAINT `ProductIngredient_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductIngredient` ADD CONSTRAINT `ProductIngredient_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `ingredients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photo_products` ADD CONSTRAINT `photo_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees_photo` ADD CONSTRAINT `employees_photo_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToScreens` ADD CONSTRAINT `_EmployeeToScreens_A_fkey` FOREIGN KEY (`A`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToScreens` ADD CONSTRAINT `_EmployeeToScreens_B_fkey` FOREIGN KEY (`B`) REFERENCES `Screens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
