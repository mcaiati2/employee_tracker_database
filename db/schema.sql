DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees (id)
        ON DELETE SET NULL -- If a user's manager is deleted, set the manager_id to NULL
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(200) NOT NULL,
    type VARCHAR(200) NOT NULL,
    region VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    shop_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES shops (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES employees (id) ON DELETE CASCADE
);