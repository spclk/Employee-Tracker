// Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const fs = require('fs')

// Server connection
const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: '',

  password: '',
  database: 'employee_db',
});

// Main function to navigate user in CLI
const allQuestions = () => {
  inquirer
    .prompt(
      {
        name: "questions",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Departments",
          "View Employees",
          "View Roles",
          "Add Department",
          "Add Employee",
          "Add Role",
          "Update Department",
          "Update Employee",
          "Update Role",
          "Exit",
        ],
      },
    )
    .then((response) => {
      switch (response.questions) {
        case "View Departments":
          viewDepartments();
          break;

        case "View Employees":
          viewEmployees();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Update Employee":
          updateEmployee();
          break;

        case "Exit":
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${response.action}`);
          break;
      }
    });
};

const viewDepartments = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    res.forEach(({ name }) => console.log(name));
    allQuestions();
  });
};

const viewEmployees = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    res.forEach(({ first_name, last_name }) => console.log(first_name, last_name));
    allQuestions();
  });
};

const viewRoles = () => {
  const query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    res.forEach(({ title }) => console.log(title));
    allQuestions();
  });
};

const addDepartment = () => {
  inquirer
    .prompt(
      {
        name: "newDepartment",
        type: "input",
        message: "Please add a new department",
      }
    )
    .then((answer) => {
      const query = "INSERT INTO department SET ?"
      connection.query(query,
        {
          name: answer.newDepartment
        },
        (err, res) => {
          if (err) throw err;
        })
      allQuestions();
    })
}

const addRole = () => {
  const query = "SELECT * FROM department";
  // const query = "SELECT id, name AS title FROM department"
  connection.query(query, (err, res) => {
    inquirer
      .prompt([
        {
          name: "newRole",
          type: "input",
          message: "What's the title of the this new role?",
        },
        {
          name: "newSalary",
          type: "input",
          message: "What's the salary for this role?",
        },
        {
          name: "roleDepartment",
          type: "list",
          message: "What department does this role belong to",
          choices: res
        }
      ])
      .then((answer) => {
        let match = res.find((dept) => {
          return dept.name === answer.roleDepartment
        })
        console.log(match)
        const query = "INSERT INTO role SET ?"
        connection.query(query,
          {
            title: answer.newRole,
            salary: answer.newSalary,
            department_id: match.id
          },
          (err, res) => {
            if (err) throw err;
          })
        allQuestions();
      })
  })
};
// const afterConnection = () => {
//   connection.query('SELECT * FROM', (err, res) => {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// };
// connection.connect((err) => {
//   if (err) throw err;
//   console.log(`connected as id ${connection.threadId}`);
//   connection.end();
// });

allQuestions();