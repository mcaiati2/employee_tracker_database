import inquirer from 'inquirer';
import { getAllDepartments, getAllEmployees, getAllRoles, createDepartment } from './query.js';

let showWelcome = false;


export async function createDepartment() {

    const employeesArray = await getAllEmployees();
    const { department_name, department_id } = await inquirer.prompt([
        {
            message: 'Please select the owner of the shop',
            name: 'user_id',
            type: 'list',
            choices: employeesArray.map((employeeObj) => {
                return {
                    name: employeeObj.user_name,
                    value: employeeObj.id
                };
            })
        },
        {
            message: 'Enter the employee\'s first name',
            name: 'name',
            type: 'input'
        },
        {
            message: 'Enter the employee\s address',
            name: 'address',
            type: 'input'
        }
    ]);

    await createDepartment(department_name, department_id);
}

export async function showAllDepartments() {
    const departmentRowsArray = await getAllDepartments();
    console.table(departmentRowsArray);

}

export async function showAllRoles() {
    const rolesRowsArray = await getAllRoles();
    console.table(rolesRowsArray);
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
                value: viewRoles,
            },
            {
                name: 'View all employees',
                value: viewEmployees,
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
            }
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
