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
	'null' AS 'Department',
	FORMAT(salary,2) AS 'Salary',
	IFNULL(CONCAT(m.first_name,' ',m.last_name),'The Board') AS 'Manager'
FROM employee as a
JOIN role
on role.id = a.role_id
left outer Join employee as m
on a.manager_id = m.id
where (a.id <> m.id or a.manager_id is null)
and (role.department_id is null);