INSERT INTO `department` (name) VALUES 
("Front End"), ("Back End"), ("Quality Assurance");

INSERT INTO `role` (`title`,`salary`,`department_id`) VALUES
("Junior Engineer", 100000, 1), ("Senior Engineer", 150000, 2), ("Manual Tester", 80000, 3);

INSERT INTO `employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES
("John", "Smith", 2, null), ("Jane", "Doe", 1, 1), ("Bob", "Johnson", 3, 1);


