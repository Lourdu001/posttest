const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT||3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
 
});

// Example API to get data
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Insert failed");
  }
});
app.post('/api/save-json', async (req, res) => {
  const jsonData = req.body;
  try {
    await pool.query('INSERT INTO json_data(data) VALUES($1)', [jsonData]);
    res.send({ message: 'JSON stored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error storing JSON');
  }
});
app.get('/api/get-json', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM json_data');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching JSON');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
