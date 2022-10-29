/*************************************************************************
 -- Title: SQL: Employee Tracker
 -- Author: Scott Gauthier
 -- Desc: This file is for accessing and storing data.
 -- Change Log: When,Who,What
 -- 2022-10-25, Sgauthier, Created File
 **************************************************************************/
DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE -- DROP
Table department(
     id int AUTO_INCREMENT NOT NULL,
     name nvarchar(30) NOT NULL,
     PRIMARY KEY (id),
     UNIQUE (name)
);

CREATE -- DROP
Table role(
     id int AUTO_INCREMENT NOT NULL,
     title nvarchar(30) NOT NULL,
     salary decimal NOT NULL,
     department_id int,
     UNIQUE KEY unique_key (title, salary, department_id),
     PRIMARY KEY (id),
     FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE -- DROP
Table employee(
     id int AUTO_INCREMENT NOT NULL,
     first_name nvarchar(30) NOT NULL,
     last_name nvarchar(30) NOT NULL,
     role_id int NOT NULL,
     manager_id int,
     PRIMARY KEY (id)
);

Alter Table
     employee
Add
     Constraint pkemployee Foreign Key (manager_id) References employee(id)
     ON UPDATE CASCADE;

Alter Table
     employee
Add
     Constraint unique_key UNIQUE (first_name, last_name, role_id, manager_id);