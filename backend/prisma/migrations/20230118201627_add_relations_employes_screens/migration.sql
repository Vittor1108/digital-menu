-- CreateTable
CREATE TABLE `_EmployeeToScreens` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmployeeToScreens_AB_unique`(`A`, `B`),
    INDEX `_EmployeeToScreens_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EmployeeToScreens` ADD CONSTRAINT `_EmployeeToScreens_A_fkey` FOREIGN KEY (`A`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToScreens` ADD CONSTRAINT `_EmployeeToScreens_B_fkey` FOREIGN KEY (`B`) REFERENCES `Screens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
