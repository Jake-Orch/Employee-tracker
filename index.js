const inquirer = require('inquirer');
const db = require('./config/connection');
const strings = require('./assets/strings');

function init() {
    inquirer.prompt([
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
                db.query(strings.ViewD, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(res);
                    };
                    init();
                });
            } else if (d.main == 'View All Roles') {
                db.query(strings.ViewR, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(res);
                    };
                    init();
                });
            } else if (d.main == 'View All Employees') {
                db.query(strings.ViewE, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(res);
                    };
                    init();
                });
            } else if (d.main == 'Add Department') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Insert Department Name'
                    }
                ])
                    .then((d) => {
                        db.query(strings.AddD, [d.name], (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {
                                db.query(strings.ViewD, (err, res) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.table(res);
                                    }
                                    console.log('Department added Succesfully');
                                    init();
                                });
                            };
                        });
                    });
            } else if (d.main == 'Add Role') {
                db.query(strings.ViewD, (err, res) => {
                    const resultDep = res.map((departments) => {
                        return { name: departments.name, value: departments.id }
                    })
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'title',
                            message: 'Insert Role Title'
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'Insert Role Salary'
                        },
                        {
                            type: 'list',
                            name: 'department_id',
                            message: 'Select The Correct Department For The Role',
                            choices: resultDep
                        }
                    ])
                        .then((d) => {
                            db.query(strings.AddR, [d.title, d.salary, d.department_id], (err, res) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    db.query(strings.ViewR, (err, res) => {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.table(res);
                                        }
                                        console.log('Role added Succesfully');
                                        init();
                                    });
                                };
                            });
                        })
                });

            } else if (d.main == 'Add Employee') {
                db.query(strings.ViewR, (err, res) => {
                    const resultRole = res.map((roles) => {
                        return { name: roles.title, value: roles.id }
                    })
                    db.query(strings.ViewM, (err, res) => {
                        const resultEmp = res.map((employee) => {
                            return { name: employee.first_name + " " + employee.last_name, value: employee.id }
                        })
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'first_name',
                                message: 'Insert Employees First Name'
                            },
                            {
                                type: 'input',
                                name: 'last_name',
                                message: 'Insert Employees Last Name'
                            },
                            {
                                type: 'list',
                                name: 'role_id',
                                message: 'Select The Role Which The Employee Holds',
                                choices: resultRole
                            },
                            {
                                type: 'list',
                                name: 'manager_id',
                                message: 'Select The Manager Of The Employee',
                                choices: resultEmp
                            }

                        ])
                            .then((d) => {
                                db.query(strings.AddE, [d.first_name, d.last_name, d.role_id, d.manager_id], (err, res) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        db.query(strings.ViewE, (err, res) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.table(res);
                                            }
                                            console.log('Employee added Succesfully');
                                            init();
                                        });
                                    };
                                });
                            });
                    });
                })

            } else if (d.main === 'Update An Employee') {
                db.query(strings.ViewE, (err, res) => {
                    const empName = res.map((employee) => {
                        return { name: employee.first_name + " " + employee.last_name, value: employee.id }
                    })
                    db.query(strings.AddR, (err, res) => {
                        const newRole = res.map((role) => {
                            return { name: role.title, value: role.id }
                        })
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'employee',
                                message: 'Select The Employee You Wish To Update',
                                choices: empName
                            },
                            {
                                type: 'list',
                                name: 'role',
                                message: 'Select The Employees New Role',
                                choices: newRole
                            }
                        ])
                        .then((d) => {
                            db.query(strings.UpdateE, [d.role, d.employee], (err, res) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Employee role sucessfully updated')
                                }
                            })
                            init()
                        })
                    })
                })
            }
        });
};

init();