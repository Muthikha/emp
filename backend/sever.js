const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// PostgreSQL connection
const pool = new Pool({
    host: "localhost",
    database: "employee_psql",
    port: 5432,
    user: "postgres",
    password: "root",
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL database');
    release();
});

// Endpoint to get employees
app.get('/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Endpoint to add a new employee
app.post('/employees', async (req, res) => {
    const { name, position, department } = req.body;
    try {
        const newEmployee = await pool.query(
            'INSERT INTO employees (name, position, department) VALUES ($1, $2, $3) RETURNING *',
            [name, position, department]
        );
        res.json(newEmployee.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
