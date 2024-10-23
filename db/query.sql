\c employee_tracker_db;

SELECT
    departments.id AS department_id,
    departments.name AS department_name,
    
    employees.id AS employee_id,
    CONCAT(employees.first_name, ' ', employees.last_name) AS employee_name,
    CONCAT(managers.first_name, ' ', managers.last_name) AS manager,
    roles.job_title AS job_title,
    roles.salary,
    employees.manager_id

FROM roles
JOIN departments
    ON roles.department_id = departments.id
JOIN employees
    ON roles.id = employees.role_id
LEFT JOIN employees AS managers
    ON employees.manager_id = managers.id;