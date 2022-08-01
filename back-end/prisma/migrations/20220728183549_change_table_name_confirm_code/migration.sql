/*
  Warnings:

  - You are about to drop the `confirm_login_code` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `confirm_login_code` DROP FOREIGN KEY `confirm_login_code_userId_fkey`;

-- DropTable
DROP TABLE `confirm_login_code`;

-- CreateTable
CREATE TABLE `confirm_login_user_code` (
    `id` VARCHAR(191) NOT NULL,
    `expiresIn` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,

    UNIQUE INDEX `confirm_login_user_code_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `confirm_login_user_code` ADD CONSTRAINT `confirm_login_user_code_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
