-- AlterTable
ALTER TABLE `customer_order` ADD COLUMN `finalTime` DATETIME(3) NULL,
    ADD COLUMN `timeFinished` DATETIME(3) NULL,
    ADD COLUMN `timePreparation` DATETIME(3) NULL,
    ADD COLUMN `timeReceived` DATETIME(3) NULL;
