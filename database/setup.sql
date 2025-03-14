-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS job_app_tracker;
USE job_app_tracker;

-- Create the roles table (Admin/User)
CREATE TABLE IF NOT EXISTS Roles (
    RoleID INT PRIMARY KEY AUTO_INCREMENT,
    RoleName VARCHAR(50) NOT NULL UNIQUE CHECK (RoleName IN ('Admin', 'User'))
);

-- Create the users table
CREATE TABLE IF NOT EXISTS Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    RoleID INT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID) ON DELETE CASCADE
);

-- Insert default roles (Admin/User) if not already present
INSERT IGNORE INTO Roles (RoleName) VALUES ('Employee'), ('Employer');
