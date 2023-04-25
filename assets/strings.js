const strings= {
    ViewD: 'SELECT * FROM department',
    ViewR: 'SELECT * FROM role',
    ViewE: 'SELECT * FROM employee',
    ViewM: 'SELECT first_name, last_name, id FROM employee',
    AddD: 'INSERT INTO department (name) VALUES (?)',
    AddR: 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
    AddE: 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    UpdateE: 'UPDATE employee SET role_id = (?) WHERE id = (?)',
};

module.exports = strings;