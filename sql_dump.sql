CREATE DATABASE IF NOT EXISTS test;
USE test;

DROP TABLE IF EXISTS `test_table`;
CREATE TABLE `test_table` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `make` VARCHAR(50) NOT NULL,
  `model` VARCHAR(50) NOT NULL,
  `year` INT(4) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `test_table` (`make`, `model`, `year`, `price`) VALUES
('Toyota', 'Corolla', 2020, 18500.00),
('Honda', 'Civic', 2019, 17800.00),
('Ford', 'Mustang', 2021, 36000.00),
('Chevrolet', 'Camaro', 2020, 34500.00),
('BMW', '320i', 2018, 27000.00),
('Mercedes-Benz', 'C200', 2022, 42000.00),
('Audi', 'A4', 2021, 39500.00),
('Hyundai', 'Elantra', 2020, 16500.00),
('Kia', 'Sportage', 2019, 21000.00),
('Nissan', 'Altima', 2021, 24000.00);
