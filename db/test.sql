USE employee_tracker;

SELECT
    name AS 'Name',
    id AS 'Department Id'
FROM
    department;

SELECT
    role.id AS 'Role Id',
    title AS 'Title',
    department.name AS 'Department',
    salary AS 'Salary'
FROM
    role
    join department on role.id = department.id
order by
    role.id;

SELECT
    a.id AS 'Employee Id',
    a.first_name AS 'First Name',
    a.last_name AS 'Last Name',
    title AS 'Title',
    department.name AS "Department",
    FORMAT(salary, 2) AS 'Salary',
    IFNULL(CONCAT(m.first_name, ' ', m.last_name), '') AS 'Manager'
FROM
    employee as a
    JOIN role on role.id = a.id
    Join department on role.department_id = department.id
    Left Outer Join employee as m on a.manager_id = m.id
where
    a.id <> m.id
    or a.manager_id is null;

INSERT INTO
    produce (id, name)
VALUES
    (1, "apple"),
INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Intern', 1, 1);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Intern', 1, 1);

USE employee_tracker;

ALTER TABLE employee
DROP INDEX unique_key;

UPDATE
    employee
SET
    first_name = 'Bob',
    last_name = 'Sam',
    role_id = 1,
    manager_id = 1
WHERE
    id = 5;
    
Alter Table
     employee
Add
     Constraint unique_key UNIQUE (first_name, last_name, role_id, manager_id);
