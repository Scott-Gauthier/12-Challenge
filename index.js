const inquirer = require('inquirer');

var logo = (`\n
,---------------------------------------------------------------------;
|                                                                     |
|      _____                     _                                    |
|     |     |   __  __   _____  | |  _____    _   _   ____   _____    |
|     |   __|  |  |_| | |  _  | | | |  _  |  | | | | | __ | | __  |   |
|     |  _|    |  __  | | |_| | | | | | | |  | |_| | |  __| |  ___|   |
|     | |___   | |  | | |  ___| | | | |_| |  |__,  | |  |_  |  |__    |
|     |_____|  |_|  |_| |  |    |_| |_____|   __|  | |____| |_____|   |
|                       |__|                 |_____|                  |
|                                                                     |
|                                                                     |
|                                                                     |
,---------------------------------------------------------------------;
\n
`);

const departmentPrompt = [

    {
        type: 'list',
        message: 'Please enter the name of the department.',
        name: 'employee',
        default: "Manager",
    }
];
const rolePrompt = [
    {
        type: 'input',
        message: `What is name of the role?`,
        name: 'role_name',
        default: "Intern",
    },
    {
        type: 'input',
        message: `What is this role's salary?`,
        name: 'role_id',
        default: "1",
    },
    {
        type: 'input',
        message: `Which department does this role belong under?`,
        name: 'role_department',
        default: "Accounting",
        choices: [
            'Accounting',
            'Finance',
            'need to get list from departmentPrompt...',
        ]
    },
];
const employeePrompt = [
    {
        type: 'input',
        message: `What is the employee's first name?`,
        name: 'employee_first_name',
        default: "Bob",
    },
    {
        type: 'input',
        message: `What is the ${employee}'s first last?`,
        name: 'employee_first_last',
        default: "Dole",
    },
    {
        type: 'input',
        message: `What is ${employee}'s role?`,
        name: 'employee_role',
        default: "Accounting",
        choices: [
            'Accounting',
            'Finance',
            'need to get list from departmentPrompt...',
        ]
    },
    {
        type: 'input',
        message: `Who is ${employee}'s manager?`,
        name: 'employee_manager',
        default: "Scott",
        choices: [
            'Scott',
            'Bob',
            'need to get list from Employee...',
        ]
    },
];
function initialAsk() {
    console.log(logo);
    const initialPrompt = [

        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'employee',
            default: "Manager",
            choices: [
                { name: 'view all departments', value: 'viewdepartment', },
                { name: 'view all roles', value: 'viewroles', },
                { name: 'view all employees', value: 'viewemployees', },
                { name: 'add a department', value: 'adddepartment', },
                { name: 'add a role', value: 'addrole', },
                { name: 'add an employee', value: 'addemployee', },
                { name: 'update an employee role', value: 'updateemployee', },
            ],
        }
    ];

    inquirer
        .prompt(initialPrompt)
        .then((response) => {
            switch (response) {
                case 'viewdepartment':
                    console.log(response);
                    break;
                case 'viewroles':
                    console.log(response);
                    break;
                case 'viewemployees':
                    console.log(response);
                    break;
                case 'adddepartment':
                    console.log(response);
                    break;
                case 'addrole':
                    console.log(response);
                    break;
                case 'addemployee':
                    console.log(response);
                    break;
                case 'updateemployee':
                    console.log(response);
                    break;
                default:
            }
            console.log(response);
        })
        .catch((err) => {
            err ? console.log(err) : console.log('Success!')
        }
        );
}
initialAsk()

