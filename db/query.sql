\c employee_tracker_db;

SELECT
    departments.id AS department_id,
    departments.name AS department_name,
    
    employees.id AS employee_id,
    CONCAT(employees.first_name, ' ', employees.last_name) AS employee_name,
    CONCAT(managers.first_name, ' ', managers.last_name) AS manager,
    employees.job_title,
    employees.salary,
    employees.manager_id,

    roles.id AS role_id,
    roles.job_title AS role_job_title,
    roles.salary AS role_salary

FROM roles
JOIN departments
    ON roles.department_id = departments.id
JOIN employees
    ON roles.user_id = employees.id
LEFT JOIN employees AS managers
    ON employees.manager_id = managers.id;