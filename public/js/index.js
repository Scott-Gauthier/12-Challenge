const inquirer = require('inquirer');
const mysql = require('mysql2');
//While required I prefer the console.table better than this installed version....
//const cTable = require('console.table');

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

function askquestions() {


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

                { name: 'view employees by manager', value: 'viewemployeesbymanager', },
                { name: 'view employees by departments', value: 'viewemployeesbydepartment', },

                { name: 'add a department', value: 'adddepartment', },
                { name: 'add a role', value: 'addrole', },
                { name: 'add an employee', value: 'addemployee', },
                { name: 'update an employee role', value: 'updateemployee', },
                { name: 'department utilized budget', value: 'departmentutilizedbudget', },

                { name: 'delete a department', value: 'deletedepartment', },
                { name: 'delete a role', value: 'deleteroles', },
                { name: 'delete an employee', value: 'deleteemployees', },

                { name: 'Exit the application', value: 'exit', },
            ],
        }
    ];

    const queryChoicesResults1 = [];
    const queryChoicesResults2 = [];
    const queryChoicesResults3 = [];

    sql1 = `SELECT
                CONCAT(first_name,' ',last_name, ' id: ', id) AS name,
                employee.id as value
            FROM employee
            ORDER By employee.id;`;
    sql2 = `SELECT
                CONCAT(role.title,'-',department.name) AS name,
                role.id as value
            FROM role
            Join department
            on role.department_id = department.id
            union all
            SELECT
                CONCAT(role.title,'- null') AS name,
                role.id as value
            FROM role
            where role.department_id is null`;
    sql3 = `SELECT
                department.name AS name,
                department.id as value
            FROM department;`;

    const queryChoice1 = () => {
        db.query(sql1).on('result', function (row) {
            queryChoicesResults1.push(row);
        })
    };

    const queryChoice2 = () => {
        db.query(sql2).on('result', function (row) {
            queryChoicesResults2.push(row);
        })
    };

    const queryChoice3 = () => {
        db.query(sql3).on('result', function (row) {
            queryChoicesResults3.push(row);
        })
    };

    let combinedArray = [];

    const employeeUpdatePrompt = [
        //really question is needed to make the next question work. Doesn't work otherwise....
        {
            type: 'confirm',
            message: 'Are you sure?',
            name: 'confirmquestion',
            default: false
        },
        {
            type: 'list',
            message: `Which employee would you like to update?`,
            name: 'updated_employee',
            //default: ' ',
            choices: queryChoicesResults1
        },
    ];
    const employeeDeletePrompt = [
        //really question is needed to make the next question work. Doesn't work otherwise....
        {
            type: 'confirm',
            message: 'Are you sure?',
            name: 'confirmquestion',
            default: false
        },
        {
            type: 'list',
            message: `Which employee would you like to delete?`,
            name: 'delete_employee',
            //default: ' ',
            choices: queryChoicesResults1
        },
    ];
    const roleDeletePrompt = [
        //really question is needed to make the next question work. Doesn't work otherwise....
        {
            type: 'confirm',
            message: 'Are you sure?',
            name: 'confirmquestion',
            default: false
        },
        {
            type: 'list',
            message: `Which role would you like to delete?`,
            name: 'delete_role',
            //default: ' ',
            choices: queryChoicesResults2
        },
    ];

    const departmentDeletePrompt = [
        //really question is needed to make the next question work. Doesn't work otherwise....
        {
            type: 'confirm',
            message: 'Are you sure?',
            name: 'confirmquestion',
            default: false
        },
        {
            type: 'list',
            message: `Which department would you like to delete?`,
            name: 'delete_department',
            //default: ' ',
            choices: queryChoicesResults3
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
            message: `What is the employee's last name?`,
            name: 'employee_last_name',
            default: "Dole",
        },
        {
            type: 'list',
            message: `What is employee's role?`,
            name: 'employee_role',
            //default: ' ',
            choices: queryChoicesResults2
        },
        {
            type: 'list',
            message: `Who is employee's manager?`,
            name: 'employee_manager',
            //default: ' ',
            choices: queryChoicesResults1
        },
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
            choices: queryChoicesResults3,
        }
    ]

    function ifClause({ err, res }, value, name, action) {
        if (res) {
            console.log(`${name}  ${value[0].name} has been ${action} the database!`);
        } else if (err.code == 'ER_DUP_ENTRY') {
            console.log(`${value[0].name} already exists! Please use the ${value[0].name} ${name} that already exists.`);
        } else {
            console.log('Wow you really broke things!');
        }
    }

    function sqlMultiParameters(sql, parameters, selected, action) {
        db.query(sql, [parameters[0].name, parameters[0].filter2, parameters[0].filter3, parameters[0].filter4], async (err, res) => {
            if (selected === 'single') {
                setTimeout(() => {
                    console.table(res);
                    askquestions();
                }, 10);
            } else {
                ifClause({ err, res }, parameters, selected, action);
                askquestions();
            }
        });
    };

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
                    sqlMultiParameters(sql,[{ name: 'single query' }], 'single');
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
                        union all
                        SELECT
                            role.id AS 'Role Id',
                            title AS 'Title',
                            'null' AS 'Department',
                            FORMAT(salary,2) AS 'Salary'
                        FROM role
                        where role.department_id is null;`;
                    sqlMultiParameters(sql, [{ name: 'single query' }], 'single');
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
                        on role.id = a.role_id
                        Join department
                        on role.department_id = department.id
                        left outer Join employee as m
                        on a.manager_id = m.id
                        where a.id <> m.id or a.manager_id is null
                        union all
                        SELECT
                            a.id AS 'Employee Id',
                            a.first_name AS 'First Name',
                            a.last_name AS 'Last Name',
                            title AS 'Title',
                            'null' AS "Department",
                            FORMAT(salary,2) AS 'Salary',
                            IFNULL(CONCAT(m.first_name,' ',m.last_name),'The Board') AS 'Manager'
                        FROM employee as a
                        JOIN role
                        on role.id = a.role_id
                        left outer Join employee as m
                        on a.manager_id = m.id
                        where role.department_id is null and (a.id <> m.id or a.manager_id is null);`;
                    sqlMultiParameters(sql, [{ name: 'single query' }], 'single');
                    break;
                case 'viewemployeesbymanager':
                    sql = `
                        SELECT *
                        FROM (
                        SELECT
                            IFNULL(m.id,0) AS 'Manager Id',
                            IFNULL(CONCAT(m.first_name,' ',m.last_name),'The Board') AS 'Manager',
                            a.first_name AS 'First Name',
                            a.last_name AS 'Last Name',
                            title AS 'Title',
                            department.name AS "Department",
                            FORMAT(salary,2) AS 'Salary'
                        FROM employee as a
                        JOIN role
                        on role.id = a.role_id
                        Join department
                        on role.department_id = department.id
                        left outer Join employee as m
                        on a.manager_id = m.id
                        where a.id <> m.id or a.manager_id is null
                        union all
                        SELECT
                            IFNULL(m.id,0) AS 'Manager Id',
                            IFNULL(CONCAT(m.first_name,' ',m.last_name),'The Board') AS 'Manager',
                            a.first_name AS 'First Name',
                            a.last_name AS 'Last Name',
                            title AS 'Title',
                            'null' AS "Department",
                            FORMAT(salary,2) AS 'Salary'
                        FROM employee as a
                        JOIN role
                        on role.id = a.role_id
                        left outer Join employee as m
                        on a.manager_id = m.id
                        where role.department_id is null and (a.id <> m.id or a.manager_id is null)) t
                        order by 'Manager Id';`;
                    sqlMultiParameters(sql, [{ name: 'single query' }], 'single');
                    break;
                case 'viewemployeesbydepartment':
                    sql = `SELECT
                            department.name AS "Department",
                            a.first_name AS 'First Name',
                            a.last_name AS 'Last Name',
                            title AS 'Title',
                            IFNULL(a.id,0) AS 'Employee Id'
                        FROM
                            employee as a
                            JOIN role on role.id = a.id
                            Join department on role.department_id = department.id
                        
                        order by
                            department.id, a.id;`;
                    sqlMultiParameters(sql, [{ name: 'single query' }], 'single');
                    break;
                case 'adddepartment':
                    inquirer
                        .prompt(departmentPrompt)
                        .then((response) => {
                            const sql = `INSERT INTO department (name) VALUES (?)`;
                            const data = [response].map((item) => ({ name: item.department }));
                            sqlMultiParameters(sql, data, 'department', 'added to');
                        });
                    break;
                case 'addrole':
                    queryChoice3();
                    inquirer
                        .prompt(rolePrompt)
                        .then((response) => {
                            const sql = `INSERT INTO role (title,salary,department_id) VALUES (?,?,?)`;
                            const data = [response].map((item) => ({ name: item.role_name, filter2: item.role_salary, filter3: item.role_department }));
                            sqlMultiParameters(sql, data, 'role', 'added to');
                        });
                    break;
                case 'addemployee':
                    queryChoice1();
                    queryChoice2();
                    inquirer
                        .prompt(employeePrompt)
                        .then((response) => {
                            const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`;
                            const data = [response].map((item) => ({ name: item.employee_first_name, filter2: item.employee_last_name, filter3: item.employee_role, filter4: item.employee_manager }));
                            sqlMultiParameters(sql, data, 'employee', 'added to');
                        });
                    break;
                case 'updateemployee':
                    queryChoice1();
                    queryChoice2();
                    // queryChoice3();

                    combinedArray = combinedArray.concat(employeeUpdatePrompt, employeePrompt);

                    inquirer
                        .prompt(combinedArray)
                        .then((employeeupdateresponse) => {
                            if (employeeupdateresponse.confirmquestion === true) {
                                const sql = `
                                        UPDATE employee
                                        SET first_name = ?,last_name = ?,role_id = ?, manager_id = ?
                                        WHERE id = ?;`;
                                db.query(sql, [employeeupdateresponse.employee_first_name, employeeupdateresponse.employee_last_name, employeeupdateresponse.employee_role, employeeupdateresponse.employee_manager, employeeupdateresponse.updated_employee], (err, response) => {
                                    if (response) {
                                        if (response.info == 'Rows matched: 1  Changed: 0  Warnings: 0') {
                                            console.log('No records changed! Input was same as the database.')
                                        } else if (response.info == 'Rows matched: 1  Changed: 1  Warnings: 0') {
                                            console.table(`Employee '${queryChoicesResults1[employeeupdateresponse.updated_employee - 1].name}' was updated to '${employeeupdateresponse.employee_first_name} ${employeeupdateresponse.employee_last_name} 'in the database!`);
                                        }
                                    }
                                    else if (err.code == 'ER_DUP_ENTRY') {
                                        console.table(`${employeeupdateresponse.employee_first_name} already exists! Please use the ${employeeupdateresponse.employee_first_name} role that already exists.`);
                                    } else {
                                        console.log('Wow you really broke things!');
                                    }
                                    askquestions();
                                });
                            } else {
                                console.log('No record added.')
                                setTimeout(() => {
                                    askquestions();
                                }, 1);
                            };
                        });
                    break;
                case 'departmentutilizedbudget':
                    sql = `
                            SELECT
                                department.name AS "Department",
                                FORMAT(sum(salary),2) AS 'Salary'
                            FROM employee as a
                            JOIN role
                            on role.id = a.role_id
                            Join department
                            on role.department_id = department.id
                            group by department;`;
                    sqlMultiParameters(sql, [{ name: 'single query' }], 'single');
                    break;
                case 'deletedepartment':
                    queryChoice3();
                    inquirer
                        .prompt(departmentDeletePrompt)
                        .then((response) => {
                            const sql = `DELETE FROM department WHERE id = (?);`;
                            const data = [response].map((item) => ({ name: item.department }));
                            sqlMultiParameters(sql, [{ name: response.delete_department }], 'department', 'delete from');
                        });
                    break;
                case 'deleteroles':
                    queryChoice2();
                    inquirer
                        .prompt(roleDeletePrompt)
                        .then((response) => {
                            const sql = `DELETE FROM role WHERE id = (?);`;
                            const data = [response].map((item) => ({ name: item.department }));
                            sqlMultiParameters(sql, [{ name: response.delete_role }], 'role', 'delete from');
                        });
                    break;
                case 'deleteemployees':
                    queryChoice1();
                    inquirer
                        .prompt(employeeDeletePrompt)
                        .then((response) => {
                            const sql = `DELETE FROM employee WHERE id = (?);`;
                            const data = [response].map((item) => ({ name: item.department }));
                            sqlMultiParameters(sql, [{ name: response.delete_employee }], 'employees', 'delete from');
                        });
                    break;
                default:
                    db.end();
                    break;
            }
        })
        .catch((err) => {
            err ? console.log(err) : console.log('Success!')
        }
        );

}
askquestions();
