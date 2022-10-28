-- Insert multiple department
INSERT INTO department (name)
VALUES
    ("Accounting"),
    ("Finance")
;
-- Insert multiple role
INSERT INTO role (title, salary, department_id)
VALUES
    ("CFO", 300000, 2),
    ("Controller", 150000, 1)
;
-- Insert multiple employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Bob", "Johnson",2,null),
    ("Tim", "Scott",1,1)
;