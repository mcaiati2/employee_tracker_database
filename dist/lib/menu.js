import inquirer from 'inquirer';
import { getAllDepartments, getAllEmployees, getAllRoles, createDepartment, createRole, createEmployee, updateEmployeeRoleInDB } from './query.js';
let showWelcome = false;
export async function addDepartment() {
    const { department_name } = await inquirer.prompt([
        {
            message: 'Enter the name of the department you\'d like to add',
            name: 'department_name',
            type: 'input'
        },
    ]);
    await createDepartment(department_name);
}
export async function addRole() {
    const { job_title, department_id, salary } = await inquirer.prompt([
        {
            message: 'Enter the name of the role:',
            name: 'job_title',
            type: 'input',
        },
        {
            message: 'Enter the salary for the role:',
            name: 'salary',
            type: 'input'
        },
        {
            message: 'Enter the department for the role:',
            name: 'department_id',
            type: 'input'
        }
    ]);
    await createRole(job_title, department_id, salary);
}
export async function addEmployee() {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            message: 'Enter the employee\'s first name:',
            name: 'first_name',
            type: 'input'
        },
        {
            message: 'Enter the employee\'s last name:',
            name: 'last_name',
            type: 'input'
        },
        {
            message: 'Enter the employee\'s role:',
            name: 'role_id',
            type: 'input'
        },
        {
            message: 'Enter the employee\'s manager:',
            name: 'manager_id',
            type: 'input'
        }
    ]);
    await createEmployee(first_name, last_name, role_id, manager_id);
}
export async function updateEmployeeRole() {
    const employeeDataArray = await getAllEmployees();
    const roleDataArray = await getAllRoles();
    const employeeChoices = employeeDataArray.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));
    const roleChoices = roleDataArray.map(role => ({
        name: role.title,
        value: role.id
    }));
    const { employeeId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee would you like to update the role for?',
            choices: employeeChoices
        }
    ]);
    const { roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'roleId',
            message: 'Select the new role for the employee:',
            choices: roleChoices
        }
    ]);
    await updateEmployeeRoleInDB(employeeId, roleId);
    console.log('Employee role updated successfully.');
}
export async function showAllDepartments() {
    const departmentRowsArray = await getAllDepartments();
    console.table(departmentRowsArray);
}
export async function showAllRoles() {
    const rolesRowsArray = await getAllRoles();
    console.table(rolesRowsArray);
}
export async function showAllEmployees() {
    const employeeRowsArray = await getAllEmployees();
    console.table(employeeRowsArray);
}
export async function showMainMenu() {
    if (!showWelcome) {
        console.log('Welcome to the Employee Info Tracker');
        showWelcome = true;
    }
    const { optionFunction } = await inquirer.prompt({
        message: 'Please select an option',
        name: 'optionFunction',
        type: 'list',
        choices: [
            {
                name: 'View all departments',
                value: showAllDepartments,
            },
            {
                name: 'View all roles',
                value: showAllRoles,
            },
            {
                name: 'View all employees',
                value: showAllEmployees,
            },
            {
                name: 'Add a role',
                value: addRole,
            },
            {
                name: 'Add Employee',
                value: addEmployee
            },
            {
                name: 'Update employee role',
                value: updateEmployeeRole
            },
            {
                name: 'Quit',
                value: 0
            }
        ]
    });
    if (!optionFunction) {
        console.log('\nThanks for using the Employee Tracker app!');
        return;
    }
    await optionFunction();
    showMainMenu();
}
//# sourceMappingURL=menu.js.map