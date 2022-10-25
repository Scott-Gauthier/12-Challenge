--*************************************************************************--
-- Title: SQL: Employee Tracker
-- Author: Scott Gauthier
-- Desc: This file is for accessing and storing data.
-- Change Log: When,Who,What
    -- 2022-10-25, Sgauthier, Created File
--**************************************************************************--
Use Master;

Select IF((
        Select SCHEMA_NAME
        from information_schema.SCHEMATA
        Where SCHEMA_NAME = 'employee_tracker') = 'employee_tracker','true','false')
 Begin 
  Alter Database employee_tracker Rollback Immediate; --set Single_user With 
  Drop Database employee_tracker;
 End;


Create Database employee_tracker;

Use employee_tracker;