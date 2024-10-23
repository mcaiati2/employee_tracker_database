import client from '../config/connection.js';

export async function getAllDepartments() {
    const sql = `
        SELECT
            departments.id AS department_id,
            departments.name AS department_name
        FROM departments;
    `;

    const { rows } = await client.query(sql);

    return rows;
}

export async function getAllEmployees() {
    const sql = `
    SELECT 
        employees.id, 
        employees.first_name, 
        employees.last_name, 
        CONCAT(employees.first_name, ' ', employees.last_name) AS user_name,
        roles.job_title AS job_title,
        departments.name AS department_name,
        CONCAT(managers.first_name, ' ', managers.last_name) AS manager_name
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees AS managers ON employees.manager_id = managers.id
    `;

    const { rows } = await client.query(sql);

    return rows;
}

export async function getAllRoles() {
    const sql = `
    SELECT * FROM roles
    `;

    const result = await client.query(sql);
    return result.rows;
}

export async function createDepartment(departmentName: string) {
    const sql = `
    INSERT INTO departments (name) VALUES ($1)
    `;

    await client.query(sql, [departmentName]);

}

export async function createRole(job_title: string, department_id: string, salary: number) {
    const sql = `
    INSERT INTO roles (job_title, department_id, salary) VALUES ($1, $2, $3)
    `;

    await client.query(sql, [job_title, department_id, salary]);
}


export async function createEmployee(first_name: string, last_name: string, role_id: string, manager_id: string) {
    const sql = `
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES ($1, $2, $3, $4)
    `;

    await client.query(sql, [first_name, last_name, role_id, manager_id]);
}

export async function updateEmployeeRoleInDB(employeeId: string, roleId: string) {
    const sql = `
    UPDATE employees
    SET role_id = $1
    WHERE id = $2
    `;

    await client.query(sql, [roleId, employeeId]);
}