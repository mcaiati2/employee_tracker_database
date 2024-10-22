
DROP TABLE IF EXISTS wines;
DROP TABLE IF EXISTS shops;
DROP TABLE IF EXISTS employees;


-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES users (id)
        ON DELETE SET NULL --get the users' manager ids. if they match a user's id, join that row together
);

-- Create the shops table
CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    address VARCHAR(200) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create the wines table
CREATE TABLE wines (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(200) NOT NULL,
    type VARCHAR(200) NOT NULL,
    region VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    shop_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES shops (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);