/*
  Warnings:

  - Added the required column `measureRegister` to the `raw_material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `raw_material` ADD COLUMN `measureRegister` INTEGER NOT NULL;
