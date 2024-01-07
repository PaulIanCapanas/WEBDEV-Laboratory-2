const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Laboratory 2",
  password: "postgres",
  port: 5432,
});

app.use(express.json())

//Display Form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

//Display the manog utangs
app.get('/test-2', async (req, res) => {
    const client= await pool.connect()
    const result = await client.query('SELECT * FROM debt')
    res.json(result.rows)
})

//Send to database
app.post("/test", async (req, res) => {
    const dataFromFE = req.body
    console.log("data from front end: ", dataFromFE)
    const { name, money, month, day } = dataFromFE
    const client = await pool.connect()
    await client.query(`INSERT INTO debt (name, money, month, day) VALUES ($1, $2, $3, $4)`, [name, money, month, day])
    res.json({"message": "heehee"})
});

app.listen(3000, () => {
  console.log("Successful");
});
