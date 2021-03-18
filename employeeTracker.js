const mysql = require('mysql');
const inquirer = require('inquirer');
const fs = require('fs')

const connection = mysql.createConnection({
  host: 'localhost',

  port: 7777,

  user: 'root',

  password: '',
  database: '',
});

inquirer
  .prompt([
    {
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Find songs by artist',
        'Find all artists who appear more than once',
        'Find data within a specific range',
        'Search for a specific song',
        'exit',
      ],
    },
  ])
  .then((response) => {
      switch (response.action) {
        case "view departments": 
          viewDepartment();
          break;
      
        default:
          break;
      }
  }
    
  );

  function viewDepartment() {
    console.log()
  }
  
const afterConnection = () => {
  connection.query('SELECT * FROM', (err, res) => {
    if (err) throw err;
    console.log(res);
    connection.end();
  })
}
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  connection.end();
});