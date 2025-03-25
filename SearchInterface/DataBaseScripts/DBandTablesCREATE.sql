CREATE DATABASE Inventory;


--make items table 
CREATE TABLE Items (
ID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
Number VARCHAR(50) NOT NULL UNIQUE,
[Description] VARCHAR(MAX) NOT NULL,
Category INT NOT NULL,
[Status] BIT NOT NULL DEFAULT 1,
[DateCreated] DATE NOT NULL
);

--make categories table
CREATE TABLE Categories (
ID INT NOT NULL,
[Name] VARCHAR(100) NOT NULL
);