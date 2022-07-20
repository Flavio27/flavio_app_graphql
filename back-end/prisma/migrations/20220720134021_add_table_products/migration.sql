-- CreateTable
CREATE TABLE `Products` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `barcode` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type` ENUM('ALIMENTO', 'LIMPEZA', 'HIGIENE', 'UTENSILHOS') NOT NULL,

    UNIQUE INDEX `Products_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
