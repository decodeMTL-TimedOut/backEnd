-- C:\Program Files\MySQL\MySQL Server 5.7\bin
-- mysql.exe -uroot -ptimedOut

CREATE TABLE `games` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR (255),
  `GB_id` INT NOT NULL UNIQUE,
  `art` VARCHAR (5000),
  `aliases` VARCHAR (5000),
  `platform` VARCHAR (50),
  `popularity` INT DEFAULT NULL
);

CREATE TABLE `parties` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `startTime` DATETIME NOT NULL,
  `endTime` DATETIME NULL DEFAULT NULL,
  `success` TINYINT NULL DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  `gameId` INT NOT NULL,
  CONSTRAINT `parties_require_gameId` FOREIGN KEY (`gameId`) REFERENCES `games`(`id`)
);

CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(60) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME DEFAULT NULL
);

CREATE TABLE `registrations` (
  `id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `partyId` INTEGER NOT NULL,
  `userId` INTEGER NOT NULL,
  `joined` DATETIME NOT NULL,
  `left` DATETIME NULL DEFAULT NULL,
  CONSTRAINT `registrations_require_partyId` FOREIGN KEY (`partyId`) REFERENCES `parties` (`id`),
  CONSTRAINT `registrations_require_userId` FOREIGN KEY (`userId`) REFERENCES `users`(`id`)
);

CREATE TABLE `sessions` (
  `id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `token` INTEGER NOT NULL,
  `userId` INTEGER NOT NULL,
  CONSTRAINT `sessions_require_userId` FOREIGN KEY (`userId`) REFERENCES `users`(`id`)
);
