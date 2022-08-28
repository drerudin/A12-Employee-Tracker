const db = require('./db/connection.js');
const inquirer = require('inquirer');


function showAllDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    }
    );
}

function showAllRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
         questions();
    }
    );
}

function showAllEmployees() {
    db.query('SELECT * FROM employee JOIN role on (employee.role_id = role.id) JOIN department on (role.department_id = department.id)', (err, res) => {
        if (err) throw err;
        console.table(res);
         questions();
    }
    );
}

function addDepartment(userChoice) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department you would like to add?'
        }
    ]).then(function (answer) {
        db.query(`INSERT INTO department (name) VALUES ('${answer.department}')`, (err, res) => {
            if (err) throw err;
            console.log(`${answer.department} has been added to the database.`);
            questions();
        }
        );
    }
    );
}

function addRole(userChoice) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role you would like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role you would like to add?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department for the role you would like to add?'
        }
    ]).then(function (answer) {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', ${answer.salary}, (SELECT id FROM department WHERE name = '${answer.department}'))`, (err, res) => {
            if (err) throw err;
            console.log(`${answer.title} has been added to the database.`);
            questions();
        }
        );
    }
    );
}

function addEmployee(userChoice) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee you would like to add?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee you would like to add?'
        }
    ]).then(function (answer) {
        db.query(`INSERT INTO employee (first_name, last_name) VALUES ('${answer.first_name}', '${answer.last_name}')`, (err, res) => {
            if (err) throw err;
            console.log(`${answer.first_name} ${answer.last_name} has been added to the database.`);
            questions();
        }
        );
    }
    );
}

function updateEmployeeRole(userChoice) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee you would like to update?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee you would like to update?'
        }
    ]).then(function (answer) {
        db.query(`UPDATE employee SET role_id = (SELECT id FROM role WHERE title = '${userChoice}') WHERE first_name = '${answer.first_name}' AND last_name = '${answer.last_name}'`, (err, res) => {
            if (err) throw err;
            console.log(`${answer.first_name} ${answer.last_name}'s role has been updated to ${userChoice}.`);
            questions();
        }
        );
    }
    );
}


function questions() {
    inquirer.prompt(
        {
            type: 'list',
            message: "What would you like to do?",
            name: 'userChoice',
            choices: [ 'View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
        },
        )
    .then ((userChoice) => {
        switch (userChoice.userChoice){
            case "View all departments":
                showAllDepartments(userChoice)
                break
            case "View all roles":
                showAllRoles()
                break;
            case "View all employees":
                showAllEmployees(userChoice)
                break
            case "Add a department":
                addDepartment(userChoice)
                break
            case "Add a role":
                addRole(userChoice)
                break
            case "Add an employee":
                addEmployee(userChoice)
                break
            case "Update an employee role":
                updateEmployeeRole(userChoice)
                break
            case "Quit":
                console.log("Goodbye!")
                break       
        }
    });
}

questions();