CREATE DATABASE `employee_db`;

USE `employee_db`;

CREATE TABLE `department` (
	`name` VARCHAR(30) NOT NULL,
    `id` INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE `role` (
`title` VARCHAR(30) NOT NULL,
`salary` DECIMAL NOT NULL, 
`department_id` INT,
`id` INT AUTO_INCREMENT NOT NULL,
FOREIGN KEY (`department_id`) REFERENCES `department`(`id`),
PRIMARY KEY (id)
);

CREATE TABLE `employee` (
`first_name` VARCHAR(30) NOT NULL,
`last_name` VARCHAR(30) NOT NULL,
`role_id` INT,
`manager_id` INT,
`id` INT AUTO_INCREMENT NOT NULL,
FOREIGN KEY (`role_id`) REFERENCES `role`(`id`),
FOREIGN KEY (`manager_id`) REFERENCES `employee`(`id`),
PRIMARY KEY (id)
);

SELECT * FROM `department`;
SELECT * FROM `role`;
SELECT * FROM `employee`;