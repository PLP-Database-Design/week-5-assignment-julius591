// Install some dependencies
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const port = 3300;

app.use(express.json());
app.use(cors());
dotenv.config();

// Connecting to the database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'J@rgon2347',
    database: 'hospital_db'
});

// Checking the connection
db.connect((err) => {
    if (err) {
        return console.error('Error connecting to MySQL:', err);
    }
    console.log('Connected to MySQL as id:', db.threadId);
});

//Get method goes here
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// QUESTION ONE
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching patients' });
        }
        res.json(results);
    });
});

// QUESTION TWO
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching providers' });
        }
        res.json(results);
    });
});

// QUESTION THREE
app.get('/patients', (req, res) => {
    const firstName = req.query.first_name;

    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    
    db.query(query, [firstName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching patients' });
        }
        res.json(results);
    });
});

// QUESTION FOUR
app.get('/providers', (req, res) => {
    const specialty = req.query.specialty;

    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';

    db.query(query, [specialty], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching providers' });
        }
        res.json(results);
    });
});

// Start the Server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log('Sending message to the browser...');

    app.get('/', (req, res) => {
        res.send('The server has started successfully');
    });
});


