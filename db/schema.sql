DROP DATABASE IF EXISTS eetracker_db;
CREATE DATABASE eetracker_db;

USE eetracker_db;

CREATE TABLE departments(
  id INT NOT NULL,
  dep_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles(
  id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(18, 2),
  department_id INT,
  PRIMARY KEY (id),

  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);

CREATE TABLE employees(
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),

  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE SET NULL,

  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL
);