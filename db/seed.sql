INSERT INTO departments (name) VALUES 
('Engineering'),
('Human Resources'),
('Marketing'),
('Sales');

INSERT INTO roles (job_title, salary, department_id) VALUES 
('Software Engineer', 80000, 1),
('HR Manager', 60000, 2),
('Marketing Specialist', 50000, 3),
('Sales Representative', 45000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('Mark', 'Smith', 1, NULL),
('Jane', 'Thompson', 2, NULL),
('Emily', 'Stevens', 3, 1),
('Michael', 'Carpenter', 4, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('Stu', 'Curtis', 1, 1),
('Sarah', 'Simmons', 2, 2),
('Kevin', 'Quinn', 3, 3),
('Diana', 'Moore', 4, 4);