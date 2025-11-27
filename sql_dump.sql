CREATE DATABASE IF NOT EXISTS test;
USE test;

DROP TABLE IF EXISTS `test_table`;
CREATE TABLE `test_table` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `age` INT(5) NOT NULL,
  `status` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `teachers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `age` INT(5) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `test_table` (`name`, `age`, `status`) VALUES
('Tom', 21, 'Present'),
('Jerry', 87, 'Absent'),
('Micky Mouse', 23, 'Absent');

INSERT INTO `teachers` (`name`, `age`) VALUES
('Michal', 32),
('Ali', 53),
('Sayeed', 21);
