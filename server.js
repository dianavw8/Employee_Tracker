const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Pulgz03',
    database: 'eetracker_db'
  },
  console.log(`Connected to the eetracker_db database.`)
);


inquirer.prompt([
  {
    type: 'list',
    name: 'action',
    message: 'What would you like to do today?',
    choices: ['View all departments', 'View all roles', 'View all employees']
  }
]).then(answers => {
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
});

function  getAllDept(){
// Query MySQL database and display all entries in the departments table
db.query('SELECT * FROM departments', function (err, results) {
    console.log(results);
  });
}

function  getAllRoles(){
// Query MySQL database and display all entries in the departments table
db.query('SELECT * FROM roles', function (err, results) {
    console.log(results);
  });
}

function  getAllEe(){
// Query MySQL database and display all entries in the departments table
db.query('SELECT * FROM employees', function (err, results) {
    console.log(results);
  });
}