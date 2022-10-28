const inquirer = require('inquirer');
const mysql = require('mysql2');
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

const viewdepartment = async () => {
    var data = await db.promise().query('SELECT * FROM department')
    //console.log(data)
    return data[0];
}
db.connect(async function (err) {
    console.log(`Connected to SQL!`);
    data = await viewdepartment();
    dataFormatted = data.map((item) => (
        {id: item.id,
         name: item.name
        }));
    console.log(dataFormatted);
});


