/*
  Warnings:

  - The values [UTENSILHOS] on the enum `Products_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Products` MODIFY `type` ENUM('ALIMENTO', 'LIMPEZA', 'HIGIENE', 'UTENSILIOS') NOT NULL;
