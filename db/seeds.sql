INSERT INTO departments (id, dep_name)
VALUES (001, "Engineering"),
       (002, "Purchasing"),
       (003, "Sales"),
       (004, "Finance");

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Lead Engineer", 150000.00, 001),
       (002, "Software Engineer", 120000.00, 001),
       (003, "Lead Buyer", 80000.00, 002),
       (004, "Jr. Buyer", 45000.00, 002),
       (005, "Sales Lead", 80000.00, 003),
       (006, "Salesperson", 65000.00, 003),
       (007, "Account Manager", 100000.00, 004),
       (008, "Accountant", 55000.00, 004);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Henry", "Cheri", 001, NULL),
       (002, "Vicky", "Delgado", 002, 001),
       (003, "Sandra", "Wales", 003, NULL),
       (004, "Chet", "Ross", 004, 003),
       (005, "Chester", "Magee", 005, NULL),
       (006, "Karen", "Smith", 006, 005),
       (007, "Kim", "Lee", 007, NULL),
       (008, "James", "Foster", 008, 007);