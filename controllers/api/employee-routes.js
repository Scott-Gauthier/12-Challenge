const router = require('express').Router();
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

router.get('/select', (req, res) => {
// Query view all employees
db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
});
});

module.exports = router;