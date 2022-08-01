-- CreateTable
CREATE TABLE `confirm_login_code` (
    `id` VARCHAR(191) NOT NULL,
    `expiresIn` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,

    UNIQUE INDEX `confirm_login_code_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `confirm_login_code` ADD CONSTRAINT `confirm_login_code_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
