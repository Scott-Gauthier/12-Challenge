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

CREATE --DROP
Table department(
     [id] [int] Autonumber IDENTITY(1, 1) NOT NULL
    ,[name] [nvarchar](30) NOT NULL
);
CREATE --DROP
Table [role](
     [id] [int] Autonumber IDENTITY(1, 1) NOT NULL
    ,[title] [nvarchar](30) NOT NULL
    ,[salary] [decimal] NOT NULL
    ,[department_id] [int] NOT NULL
);
CREATE --DROP
Table employee(
     [id] [int] Autonumber IDENTITY(1, 1) NOT NULL
    ,[first_name] [nvarchar](30) NOT NULL
    ,[last_name] [nvarchar](30) NOT NULL
    ,[role_id] [nvarchar](30) NOT NULL
    ,[manager_id] [nvarchar](30) NOT NULL
);
Alter Table department 
 Add Constraint pkDepartment 
  Primary Key (id);