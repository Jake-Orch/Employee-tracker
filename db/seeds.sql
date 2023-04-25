USE employee_db;

INSERT INTO department (name)
VALUES
('Production'),
('Marketing'),
('Accounting'),
('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
('Production Operative', 25000.00, 1),
('Line Manager', 40000.00, 1),
('Junior Marketer', 25000.00, 2),
('Senior Marketer', 40000.00, 2),
('Junior Accountant', 30000.00, 3),
('Senior Accointant', 50000.00, 3),
('Engineer', 30000.00, 4),
('Senior Engineer', 50000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Clive', 'Erikson', 2, NULL),
('Steve', 'Roberts', 1, 2),
('John', 'Stevenson', 1, 2),
('Erik', 'Dyer', 4, NULL),
('Peter', 'Overbury', 3, 4),
('Veronica', 'Aylesbury', 6, NULL),
('Stacy', 'Vivek', 5, 6),
('Joshua', 'Blake', 8, NULL),
('Ellie', 'Ashbury', 7, 8);