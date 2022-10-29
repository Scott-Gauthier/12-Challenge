const inquirer = require('inquirer');
const mysql = require('mysql2');

function askquestions() {
    console.log(`\n
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
    \n`);

    // Connect to database
    var db = mysql.createConnection(
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

    const departmentPrompt = [
        {
            type: 'input',
            message: 'Please enter the name of the department.',
            name: 'department',
            default: 'Information Technology'
        }
    ];
    const initialPrompt = [
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'decision',
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
            name: 'role_salary',
            default: 50000,
        },
        {
            type: 'list',
            message: `Which department does this role belong under?`,
            name: 'role_department',
            choices: [
                { name: 'Accounting', value: 1, },
                { name: 'Finance', value: 2, },
            ],
        },
    ];
    const viewdepartment = () => {
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
        sql = 'SELECT * FROM department';
        const data = db.query(sql, (err, res) => {
            //console.log(res);
            return res;
        })
        console.log(data);
        return data
    }
    const employeePrompt = [
        {
            type: 'input',
            message: `What is the employee's first name?`,
            name: 'employee_first_name',
            default: "Bob",
        },

        {
            type: 'input',
            message: `What is the employee's last name?`,
            name: 'employee_last',
            default: "Dole",
        },
        {
            type: 'list',
            message: `What is employee's role?`,
            name: 'employee_role',
            //default: "Accounting",
            choices: [
                { name: 'Accounting', value: 1, },
                { name: 'Finance', value: 2, },
            ],
        },
        {
            type: 'list',
            message: `Who is employee's manager?`,
            name: 'employee_manager',
            default: "Scott",
            choices: [
                { name: 'Bob', value: 1, },
                { name: 'Tim', value: 2, },
            ],
        },
    ];

    inquirer
        .prompt(initialPrompt)
        .then((initialresponse) => {
            switch (initialresponse.decision) {
                case 'viewdepartment':
                    sql = `
                        SELECT
                            name AS 'Name',
                            id AS 'Department Id'
                        FROM department;`;
                    db.query(sql, (err, res) => {
                        console.table(res);
                    });
                    break;
                case 'viewroles':
                    sql = `
                        SELECT
                            role.id AS 'Role Id',
                            title AS 'Title',
                            department.name AS 'Department',
                            FORMAT(salary,2) AS 'Salary'
                        FROM role
                        join department
                        on role.department_id = department.id
                        order by role.id;`;
                    db.query(sql, (err, res) => {
                        console.table(res);
                    });
                    break;
                case 'viewemployees':
                    sql = `
                        SELECT
                            a.id AS 'Employee Id',
                            a.first_name AS 'First Name',
                            a.last_name AS 'Last Name',
                            title AS 'Title',
                            department.name AS "Department",
                            FORMAT(salary,2) AS 'Salary',
                            IFNULL(CONCAT(m.first_name,' ',m.last_name),'The Board') AS 'Manager'
                        FROM employee as a
                        JOIN role
                        on role.id = a.id
                        Join department
                        on role.department_id = department.id
                        Left Outer Join employee as m
                        on a.manager_id = m.id
                        where a.id <> m.id or a.manager_id is null;`;
                    db.query(sql, (err, res) => {
                        console.table(res);
                    });
                    break;
                case 'adddepartment':
                    inquirer
                        .prompt(departmentPrompt)
                        .then((departmentresponse) => {
                            //console.log(departmentresponse.department);

                            const sql = `INSERT INTO department (name)
                    VALUES (?)`;
                            //const params = [body.movie_name];

                            db.query(sql, departmentresponse.department, (err, res) => {
                                if (res) {
                                    console.table(`Department ${departmentresponse.department} has been added to the database!`);
                                } else if (err.code == 'ER_DUP_ENTRY') {
                                    console.table(`${departmentresponse.department} already exists! Please use the ${departmentresponse.department} department that already exists.`);
                                } else {
                                    console.log('Wow you really broke things!');
                                }
                            });
                        });
                    break;
                case 'addrole':
                    inquirer
                        .prompt(rolePrompt)
                        .then((roleresponse) => {
                            const sql = `INSERT INTO role (title,salary,department_id) VALUES (?,?,?)`;
                            console.log(roleresponse);
                            db.query(sql, [roleresponse.role_name, roleresponse.role_salary, roleresponse.role_department], (err, res) => {
                                console.log(res);
                                if (res) {
                                    console.table(`Role ${roleresponse.role_name} has been added to the database!`);
                                } else if (err.code == 'ER_DUP_ENTRY') {
                                    console.table(`${roleresponse.role_name} already exists! Please use the ${roleresponse.role_name} role that already exists.`);
                                } else {
                                    console.log('Wow you really broke things!');
                                }
                            });
                        });
                    break;
                case 'addemployee':
                    console.log(initialresponse.decision);
                    inquirer
                        .prompt(employeePrompt)
                        .then((employeeresponse) => {
                            const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`;
                            console.log(employeeresponse);
                            db.query(sql, [employeeresponse.employee_first_name, employeeresponse.employee_last, employeeresponse.employee_role, employeeresponse.employee_manager], (err, res) => {
                                console.log(res);
                                if (res) {
                                    console.table(`Role ${employeeresponse.employee_first_name} has been added to the database!`);
                                } else if (err.code == 'ER_DUP_ENTRY') {
                                    console.table(`${employeeresponse.employee_first_name} already exists! Please use the ${employeeresponse.employee_first_name} role that already exists.`);
                                } else {
                                    console.log('Wow you really broke things!');
                                }
                            });
                        });
                    break;
                case 'updateemployee':
                    console.log(initialresponse.decision);
                    sql = `
                        SELECT
                        CONCAT(first_name,' ',last_name, ' id: ', id) AS name,
                            id
                        FROM employee
                        ORDER By employee.id;`;
                    db.query(sql, (err, res) => {
                        const newRes = res.map((item) => ({
                            name: item.name,
                            value: item.id,
                        })

                        )
                        console.log(newRes);

                        inquirer
                            .prompt(
                                [
                                    {
                                        type: 'list',
                                        message: `Which employee would you like to update?`,
                                        name: 'updated_employee',
                                        choices: newRes,
                                    },
                                    {
                                        type: 'input',
                                        message: `What is the employee's first name?`,
                                        name: 'employee_first_name',
                                        default: "Bob",
                                    },

                                    {
                                        type: 'input',
                                        message: `What is the employee's last name?`,
                                        name: 'employee_last',
                                        default: "Dole",
                                    },
                                    {
                                        type: 'list',
                                        message: `What is employee's role?`,
                                        name: 'employee_role',
                                        //default: "Accounting",
                                        choices: [
                                            { name: 'Accounting', value: 1, },
                                            { name: 'Finance', value: 2, },
                                        ],
                                    },
                                    {
                                        type: 'list',
                                        message: `Who is employee's manager?`,
                                        name: 'employee_manager',
                                        default: "Scott",
                                        choices: [
                                            { name: 'Bob', value: 1, },
                                            { name: 'Tim', value: 2, },
                                        ],
                                    },
                                ])
                            .then((employeeupdateresponse) => {
                                console.log(employeeupdateresponse);
                                console.log(employeeupdateresponse.updated_employee);

                                const sql = `
                                        UPDATE employee
                                        SET first_name = 'Tim',last_name = 'Bob',role_id = 1, manager_id = 1
                                        WHERE id = ?;`;
                                db.query(sql, [employeeupdateresponse.updated_employee], (err, response) => {
                                    //console.log(err); //response.info
                                    if (response) {
                                        if (response.info == 'Rows matched: 1  Changed: 0  Warnings: 0') {
                                            console.log('No records changed! Input was same as the database.')
                                        } else if (response.info == 'Rows matched: 1  Changed: 1  Warnings: 0') {
                                            console.table(`Role ${employeeupdateresponse.employee_first_name} was updated in the database!`);
                                        }
                                    }
                                    else if (err.code == 'ER_DUP_ENTRY') {
                                        console.table(`${employeeupdateresponse.employee_first_name} already exists! Please use the ${employeeupdateresponse.employee_first_name} role that already exists.`);
                                    } else {
                                        console.log('Wow you really broke things!');
                                    }
                                });
                            });
                    });
                    break;
                default:
                    break;
            }
            //console.log(response);   employeePrompt
        })
        .catch((err) => {
            err ? console.log(err) : console.log('Success!')
        }
        );
}
askquestions();