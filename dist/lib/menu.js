import inquirer from 'inquirer';
import { getAllDepartments, getAllEmployees, createDepartment } from './query.js';
let showWelcome = false;
export async function addEmployee() {
    const employeesArray = await getAllEmployees();
    const { user_id, name, address } = await inquirer.prompt([
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
    await createDepartment(user_id, name, address);
}
export async function showAllDepartments() {
    const departmentRowsArray = await getAllDepartments();
    console.table(departmentRowsArray);
}
// 11:05 AM more complicated object method
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
                name: 'Show All Departments',
                value: showAllDepartments,
            },
            {
                name: 'Add Employee',
                value: addEmployee
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