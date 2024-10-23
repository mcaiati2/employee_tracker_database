import inquirer from 'inquirer';
import { getAllDepartments, getAllEmployees, getAllRoles, createDepartment, createRole, createEmployee, updateEmployeeRoleInDB } from './query.js';

let showWelcome = false;

export async function addDepartment() {
    const {department_name} = await inquirer.prompt([
        {
            message: 'Enter the Name of the Department You\'d Like to Add',
            name: 'department_name',
            type: 'input'
        },
    ]);
    
    await createDepartment (department_name);
}


export async function addRole() {
    const departments = await getAllDepartments();
    const departmentChoices = departments.map(department => ({
        name: department.name,
        value: department.id
    }));
    const { job_title, department_id, salary } = await inquirer.prompt([
        {
            message: 'Enter the Name of the Role You\'d Like to Add:',
            name: 'job_title',
            type: 'input',
        },
        {
            message: 'Enter the Salary for the Role:',
            name: 'salary',
            type: 'input'
        },
        {
            message: 'Choose the Department for the Role:',
            name: 'department_id',
            type: 'list',
            choices: departmentChoices
        }
    ]);

    await createRole(job_title, department_id, salary);
}

export async function addEmployee() {
    const roles = await getAllRoles();
    const roleChoices = roles.map(role => ({
        name: role.job_title,
        value: role.id
    }));
    const managers = await getAllEmployees();

    const managerChoices = managers.map(employee => ({
        name: employee.employee_name,
        value: employee.id
    }));

    managerChoices.unshift({ name: 'None', value: null });

    const {first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            message: 'Enter the Employee\'s First Name:',
            name: 'first_name',
            type: 'input'
        },
        {
            message: 'Enter the Employee\'s Last Name:',
            name: 'last_name',
            type: 'input'
        },
        {
            message: 'Select the Employee\'s Role:',
            name: 'role_id',
            type: 'list',
            choices: roleChoices
        },
        {
            message: 'Select the Employee\'s Manager:',
            name: 'manager_id',
            type: 'list',
            choices: managerChoices
        }
]);
    await createEmployee(first_name, last_name, role_id, manager_id);
}

export async function updateEmployeeRole() {
    const employeeDataArray = await getAllEmployees();

    const employeeChoices = employeeDataArray.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const roles = await getAllRoles();
    const roleChoices = roles.map(role => ({
        name: role.job_title,
        value: role.id 
    }));
    const { employeeId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Choose the Employee That You\'d Like to Update the Role For',
            choices: employeeChoices
        }
    ]);

    const { roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'roleId',
            message: 'Select the New Role For the Employee:',
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
            }]
    });
    if (!optionFunction) {
        console.log('\nThanks for using the Employee Tracker app!');
        return;
    }
    await optionFunction();
    showMainMenu();
}
