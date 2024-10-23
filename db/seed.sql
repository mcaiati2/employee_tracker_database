-- Create departments
INSERT INTO departments (name) VALUES 
('Engineering'),
('Human Resources'),
('Marketing'),
('Sales');

-- Create roles
INSERT INTO roles (job_title, salary, department_id) VALUES 
('Software Engineer', 80000, 1),
('HR Manager', 60000, 2),
('Marketing Specialist', 50000, 3),
('Sales Representative', 45000, 4);

-- Create employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Emily', 'Jones', 3, 1),
('Michael', 'Brown', 4, 2);

-- Create more employees with managers
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('Alice', 'Johnson', 1, 1),
('Bob', 'Davis', 2, 2),
('Charlie', 'Wilson', 3, 3),
('Diana', 'Moore', 4, 4);