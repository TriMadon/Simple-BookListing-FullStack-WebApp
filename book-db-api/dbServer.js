const express = require('express');
const mongoose = require('mongoose');
const Book = require("./Book");
const app = express();
const mysql = require('mysql2/promise');
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require('cors');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

mongoose.connect(
    "mongodb://localhost:27017/analyzed-books",
    {
        "authSource": "admin",
        "user": "admin",
        "pass": "password"
    }
);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post("/api/delete", async (req, res) =>{
    const username = req.body.username;
    const bookTitle = req.body.bookTitle;
    const sqlDelete = "DELETE FROM Saves WHERE username=? AND bookTitle=?";

    try {
        const result = await db.query(sqlDelete,[username, bookTitle]);
        res.status(200).send(result)
    } catch(e) {
        console.log(e);

        res.status(400).send(e);
    }
})

app.post("/api/get", async (req, res) =>{
    const username = req.body.username;
    const sqlSelect = "SELECT * FROM Saves WHERE username=?";

    try {
        const result = await db.query(sqlSelect,[username]);
        console.log(result[0]);
        res.status(200).send(result[0]);
    } catch(e) {
        console.log(e);
        res.status(400).send(e);
    }
})

app.post("/api/insert", async (req, res) => {
    const id = req.body.id;
    const username = req.body.username;
    const bookTitle = req.body.bookTitle;
    const rating = req.body.rating;
    const totalReads = req.body.totalReads;
    const sqlInsert = "INSERT INTO Saves (id, username, bookTitle, rating, totalReads) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE \n" +
        "rating = VALUES(rating), totalReads = VALUES(totalReads)";

    try {
        const result = await db.query(sqlInsert,[id, username, bookTitle, rating, totalReads]);
        res.status(200).send(result)
    } catch(e) {
        console.log(e);
        res.status(400).send(e);
    }
});


app.get("/api/get-analyzed-books", async (req, res) =>{
    try {
        const books = await Book.find();
        console.log(books);
        res.status(200).send(books);
    } catch(e) {
        console.log(e.message);
        res.status(400).send(e);
    }
})

app.listen(3305, () => {
    console.log("running on port 3305");
});