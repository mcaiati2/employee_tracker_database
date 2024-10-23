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
        roles.title AS job_title,
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
export async function createDepartment(departmentName) {
    const sql = `
    INSERT INTO departments (name) VALUES ($1)
    `;
    await client.query(sql, [departmentName]);
}
export async function createRole(job_title, department_id, salary) {
    const sql = `
    INSERT INTO roles (job_title, department_id, salary) VALUES ($1, $2, $3)
    `;
    await client.query(sql, [job_title, department_id, salary]);
}
export async function createEmployee(first_name, last_name, role_id, manager_id) {
    const sql = `
    INSERT INTO employees (first_name, last_name, job_title, department_id, manager_id)
    SELECT $1, $2, job_title, department_id, $4
    FROM roles
    WHERE id = $3
    `;
    await client.query(sql, [first_name, last_name, role_id, manager_id]);
}
export async function updateEmployeeRoleInDB(employeeId, roleId) {
    const sql = `
    UPDATE employees
    SET role_id = $1
    WHERE id = $2
    `;
    await client.query(sql, [roleId, employeeId]);
}
//# sourceMappingURL=query.js.map