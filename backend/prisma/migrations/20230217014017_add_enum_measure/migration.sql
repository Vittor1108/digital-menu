/*
  Warnings:

  - You are about to alter the column `measureRegister` on the `ingredients` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `ingredients` MODIFY `measureRegister` ENUM('GRAMAS', 'QUILOS', 'MILIGRAMAS') NOT NULL;
