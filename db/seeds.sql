INSERT INTO `department` (`id`, `name`) VALUES
(1, 'Engineering'),
(2, 'Marketing'),
(3, 'Sales'),
(4, 'Human Resources');

INSERT INTO role (`id`, `title`, `salary`, `department_id`) VALUES
(1, 'Engineer', 100000, 1),
(2, 'Marketing Manager', 100000, 2),
(3, 'Sales Manager', 100000, 3),
(4, 'Human Resources Manager', 100000, 4);

INSERT INTO employee (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES
(1, 'Jane', 'Smith', 1, NULL),
(2, 'Lara', 'Croft', 2, 1),
(3, 'John', 'Doe', 3, 1),
(4, 'Jack', 'Doe', 4, 1);

