const inquire = require('inquirer');

function init() {
    inquire.prompt([
        {
            type: 'list',
            name: 'main',
            message: 'Select the action you wish to take',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
        }
    ])
        .then((d) => {
            console.log(d.main);
            if (d.main == 'View All Departments') {
                console.log('1');
            } else if (d.main == 'View All Roles') {
                console.log('2');
            } else if (d.main == 'View All Employees') {
                console.log('3');
            } else if (d.main == 'Add Department') {
                console.log('4');
            } else if (d.main == 'Add Role') {
                console.log('5');
            } else if (d.main == 'Add Employee') {
                console.log('6');
            } else {
                console.log('7');
            }
        })
};

init();