SELECT
    name AS 'Name',
    id AS 'Department Id'
FROM
    department;

SELECT
    title AS 'Title',
    role.id AS 'Role Id',
    department.name AS 'Department',
    salary AS 'Salary'
FROM
    role
join department
on role.id = department.id;

SELECT
    a.id AS 'Employee Id',
    a.first_name AS 'First Name',
    a.last_name AS 'Last Name',
    title AS 'Title',
    department.name AS "Department",
    FORMAT(salary,2) AS 'Salary',
    IFNULL(CONCAT(m.first_name,' ',m.last_name),'') AS 'Manager'
FROM
    employee as a
JOIN role
on role.id = a.id
Join department
on role.department_id = department.id
Left Outer Join employee as m
on a.manager_id = m.id
where a.id <> m.id or a.manager_id is null;