CREATE TABLE `notes`.`userreq` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `faculty` VARCHAR(45) NOT NULL,
  `role` ENUM('admin','teacher','student') NOT NULL,
  `created_at` TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (`id`)
);

CREATE TABLE `notes`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `faculty` VARCHAR(45) NOT NULL,
  `role` ENUM('admin','teacher','student') NOT NULL,
  `created_at` TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (`id`)
);

CREATE TABLE `notes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,     
  `teacher_id` INT NOT NULL,               
  `title` VARCHAR(255) NOT NULL,           
  `description` TEXT NULL,
  `file` VARCHAR(255) NOT NULL,                  
  `created_at` TIMESTAMP DEFAULT NOW(),   
  `updated_at` TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  FOREIGN KEY (`teacher_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
