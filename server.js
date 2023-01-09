const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Pulgz03',
        database: 'eetracker_db'
    },
    console.log(`Connected to the eetracker_db database.`)
);
AskStartingQuestions();

function AskStartingQuestions() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to do today?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Exit']
    }]).then(answers => {
        // The user's answer is stored in answers.action
        if (answers.action === 'View all departments') {
            getAllDept();
        }
        if (answers.action === 'View all roles') {
            getAllRoles();
        }
        if (answers.action === 'View all employees') {
            getAllEe();
        }
        if (answers.action === 'Add a department') {
            addADepartment();
        }
        if (answers.action === 'Add a role') {
            addARole();
        }
        if (answers.action === 'Add an employee') {
            addAnEmployee();
        }
        if (answers.action === 'Update employee role') {
            updateEmployeeRole();
        }
        if (answers.action === 'Exit') {
            exit();
        }
    });
};

function getAllDept() {
    // Query MySQL database and display all entries in the departments table
    db.query('SELECT id as "Id", dep_name as "Department Name" FROM departments', function(err, results) {
        console.table(results);
        AskStartingQuestions();
    });
}

function getAllRoles() {
    // Query MySQL database and display all entries in the departments table
    db.query('SELECT roles.id as "Id", title as "Title", salary as "Salary", departments.dep_name as "Department Name" FROM roles LEFT JOIN departments ON departments.id = department_id', function(err, results) {
        if(err){console.log(err);}
        console.table(results);
        AskStartingQuestions();
    });
}

function getAllEe() {
    // Query MySQL database and display all entries in the departments table
    db.query(`SELECT employees.id as "Id", employees.first_name as "First Name", employees.last_name as "Last Name", roles.title as "Job Title", roles.salary as "Salary", departments.dep_name as "Department", CONCAT(managers.first_name," ", managers.last_name) as "Manager" FROM employees LEFT JOIN roles ON role_id = roles.id LEFT JOIN employees as managers ON employees.manager_id = managers.id LEFT JOIN departments ON departments.id = roles.department_id` , function(err, results) {
        if(err){console.log(err);}
        console.table(results);
        AskStartingQuestions();
    });
}

function addADepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'add_dept',
        message: 'Enter the name of the department',
    }]).then(answers => {
        db.query(`INSERT INTO departments(dep_name) VALUES ("${answers.add_dept}")`, function(err, results) {
            if (results) {
                console.log("New Department Added");
            } else console.log(err);
            AskStartingQuestions();
        });
    });
}

function updateEmployeeRole() {
    //get the choices
    let roleNames = [];
    // Return a array of string that contains the names of the departments
    db.query('SELECT title FROM roles', function(err, results) {
        results.forEach(function(role) {
            roleNames.push(role.title);
        });
        //get the choices
        let employeeNames = [];
        // Return a array of string that contains the names of the departments
        db.query('SELECT first_name, last_name FROM employees', function(err, results) {
            results.forEach(function(employee) {
                employeeNames.push(`${employee.first_name} ${employee.last_name}`);
            });
            //promt and use departmentNames as choices
            inquirer.prompt([{
                    type: 'list',
                    name: 'employee',
                    message: 'Choose an Employee to update:',
                    choices: employeeNames
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Choose a new Role for the employee:',
                    choices: roleNames
                }
            ]).then(answers => {
                db.query(`SELECT id FROM roles WHERE title = "${answers.role}"`, function(err, results) {
                    let chosenRole = results.shift();
                    let nameArray = answers.employee.split(" ");
                    let chosenFirst = nameArray[0];
                    let chosenLast = nameArray[1];
                    db.query(`SELECT id FROM employees WHERE first_name = "${chosenFirst}" AND last_name = "${chosenLast}"`, function(err, results) {
                        let chosenEmployee = results.shift();
                        db.query(`UPDATE employees SET role_id = ${chosenRole.id} WHERE id = ${chosenEmployee.id}`, function(err, results) {
                            if (results) {
                                console.log("Employee role Updated");
                            } else console.log(err);
                            AskStartingQuestions();
                        });
                    });
                });
            });
        });
    });
}

function addARole() {
    //get the choices
    let departmentNames = [];
    // Return a array of string that contains the names of the departments
    db.query('SELECT dep_name FROM departments', function(err, results) {
        results.forEach(function(department) {
            departmentNames.push(department.dep_name);
        });
        //promt and use departmentNames as choices
        inquirer.prompt([{
                type: 'input',
                name: 'title',
                message: 'Enter the title',
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter the salary',
            },
            {
                type: 'list',
                name: 'dept',
                message: 'Choose from the following departments:',
                choices: departmentNames
            }
        ]).then(answers => {
            db.query(`SELECT id FROM departments WHERE dep_name = "${answers.dept}"`, function(err, results) {
                let chosenDept = results.shift();
                db.query(`INSERT INTO roles(title, salary,department_id) VALUES ("${answers.title}", "${answers.salary}", "${chosenDept.id}")`, function(err, results) {
                    if (results) {
                        console.log("New Role Added");
                    } else console.log(err);
                    AskStartingQuestions();
                });
            });
        });
    });
}

function addAnEmployee() {
    //get the choices
    let roleNames = [];
    // Return a array of string that contains the names of the departments
    db.query('SELECT title FROM roles', function(err, results) {
        results.forEach(function(role) {
            roleNames.push(role.title);
        });
        //get the choices
        let managerNames = [];
        // Return a array of string that contains the names of the departments
        db.query('SELECT first_name, last_name FROM employees', function(err, results) {
            results.forEach(function(employee) {
                managerNames.push(`${employee.first_name} ${employee.last_name}`);
            });
            //promt and use departmentNames as choices
            inquirer.prompt([{
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter first name',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter last name',
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Choose a Manager:',
                    choices: managerNames
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Choose a Role:',
                    choices: roleNames
                }
            ]).then(answers => {
                db.query(`SELECT id FROM roles WHERE title = "${answers.role}"`, function(err, results) {
                    let chosenRole = results.shift();
                    let nameArray = answers.manager.split(" ");
                    let chosenFirst = nameArray[0];
                    let chosenLast = nameArray[1];
                    db.query(`SELECT id FROM employees WHERE first_name = "${chosenFirst}" AND last_name = "${chosenLast}"`, function(err, results) {
                        let chosenManager = results.shift();
                        db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", "${chosenRole.id}", "${chosenManager.id}")`, function(err, results) {
                            if (results) {
                                console.log("New Employee Added");
                            } else console.log(err);
                            AskStartingQuestions();
                        });
                    });
                });
            });
        });
    });
}

function exit() {
    // End Connect
    db.end;
    process.exit(0);
}