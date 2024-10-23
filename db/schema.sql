DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    job_title VARCHAR(200) NOT NULL,
    salary INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees (id)
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    job_title VARCHAR(200) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments (id)
        ON DELETE CASCADE, 
    salary INT NOT NULL 
);