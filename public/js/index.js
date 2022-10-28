const inquirer = require('inquirer');
//const department = require('../../controllers/api/department-routes.js');
//const role = require('../../controllers/api/role-routes');
//const employee = require('../../controllers/api/employee-routes');

//const cTable = require('console.table');

// Import and require mysql2
const mysql = require('mysql2');



// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '',
        database: 'employee_tracker'
    },
    console.log(`Connected to the employee_tracker database.`)
);

var logo = (`\n
,-------------------------------------------------------------;
|  _____                    _                                 |
| |     |  __  __   _____  | |  _____   _   _   ____   _____  |
| |   __| |  |_| | |  _  | | | |  _  | | | | | | __ | | __  | |
| |  _|   |  __  | | |_| | | | | | | | | |_| | |  __| |  ___| |
| | |___  | |  | | |  ___| | | | |_| | |__,  | |  |_  |  |__  |
| |_____| |_|  |_| |  |    |_| |_____|  __|  | |____| |_____| |
|                  |__|                |_____|                |
|   __  __   __ __   _ ___    _____   __ __   ____   _ __     |
|  |  \\/  | /  _  | | '_  \\  /  _  | /  _  | | __ | | ' _|    |
|  | |\\/| | | | | | | | |  | | | | | | | | | |   _| |  |      |
|  | |  | | | |_| | | | |  | | |_| | | |_| | |  |_  |  |      |
|  |_|  |_| \\__,__| |_| |__| \\__,__| \\___, | |____| |__|      |
|                                     |____/                  |
,-------------------------------------------------------------;
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
// const employeePrompt = [
//     {
//         type: 'input',
//         message: `What is the employee's first name?`,
//         name: 'employee_first_name',
//         default: "Bob",
//     },
//     {
//         type: 'input',
//         message: `What is the ${employee_first_name}'s last name?`,
//         name: 'employee_first_last',
//         default: "Dole",
//     },
//     {
//         type: 'input',
//         message: `What is ${employee_first_name}'s role?`,
//         name: 'employee_role',
//         default: "Accounting",
//         choices: [
//             'Accounting',
//             'Finance',
//             'need to get list from departmentPrompt...',
//         ]
//     },
//     {
//         type: 'input',
//         message: `Who is ${employee}'s manager?`,
//         name: 'employee_manager',
//         default: "Scott",
//         choices: [
//             'Scott',
//             'Bob',
//             'need to get list from Employee...',
//         ]
//     },
// ];

function askquestions () {
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
const viewdepartment = () => {
        sql = 'SELECT * FROM department';
        db.query(sql, (err, res) => {
           //console.log(res);
           return res;
        })
    }
    inquirer
        .prompt(initialPrompt)
        .then((response) => {
            let sql ='';
            switch  (response.employee) {
                case 'viewdepartment':
                    //console.log(response.employee);
                    
                    console.log(viewdepartment());
                    break;
                case 'viewroles':
                    sql = 'SELECT * FROM role';
                    db.query(sql, (err, res) => {
                        console.table(res);
                    });
                    break;
                case 'viewemployees':
                    sql = 'SELECT * FROM employee';
                    db.query(sql, (err, res) => {
                        console.table(res);
                    });
                    break;
                case 'adddepartment':
                    const originalList = viewdepartment();
                    console.log(viewdepartment());
                    //departmentList = originalList.map(item => {
                     //   return {
                      //      name: item.name,
                      //      value: item.id
                      //  };
                    //});

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
                    break;
            }
            console.log(response);
        })
        .catch((err) => {
            err ? console.log(err) : console.log('Success!')
        }
        );
}
askquestions()