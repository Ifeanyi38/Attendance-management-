
-- CREATE DATABASE attendance system

DROP DATABASE IF EXISTS attendance_system;
CREATE DATABASE attendance_system;
USE attendance_system;


-- TEACHERS TABLE

CREATE TABLE teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  dob DATE NOT NULL,
  teacherid VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);


-- STUDENTS TABLE

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  dob DATE NOT NULL,
  studentid VARCHAR(50) NOT NULL UNIQUE,
  class VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);


-- CLASSES TABLE (5 HARD-CODED MODULES)

CREATE TABLE classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO classes (name)
VALUES 
('Module 1'),
('Module 2'),
('Module 3'),
('Module 4'),
('Module 5');


-- ATTENDANCE TABLE

CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  class_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'late') NOT NULL,
  FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY(class_id) REFERENCES classes(id) ON DELETE CASCADE
);





-- pre filled Sample teachers for testing the database before creating from the app
INSERT INTO teachers (firstname, lastname, dob, teacherid, password)
VALUES
('John', 'Doe', '1980-05-12', 'T001', 'password123'),
('Sarah', 'Williams', '1985-10-01', 'T002', 'pass456');

-- pre filled Sample students for testing the database before creating from the app
INSERT INTO students (firstname, lastname, dob, studentid, class, password)
VALUES
('Michael', 'Smith', '2004-02-14', 'S001', 'Module 1', '123456'),
('Emily', 'Johnson', '2005-07-20', 'S002', 'Module 3', 'abc123'),
('Benjamin', 'White', '2003-11-08', 'S003', 'Module 2', 'securepass');



