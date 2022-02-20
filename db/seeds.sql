INSERT INTO department (id, name)
VALUES
    ('01', 'Human Resources'),
    ('02', 'Legal'),
    ('03', 'Finances'),
    ('04', 'Engineering'),
    ('05', 'Management'),
    ('06', 'Sales');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Hiring Manager', '60000.00', '01'),
    ('Lawyer', '100000.00', '02'),
    ('Financial Manager', '75000.00', '03'),
    ('Engineer', '90000.00', '04'),
    ('Manager', '75000.00', '05'),
    ('Sales Person', '60000.00', '06');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Mary', 'Johnson', '02', NULL),
    ('Mike', 'Walker', '01', NULL),
    ('Natalie', 'Sons', '06', '03'),
    ('Mitch', 'Brien', '03', '05'),
    ('Allison', 'Demkovich', '04', '05'),
    ('Adam', 'Carlson', '05', '01');