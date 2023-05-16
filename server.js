const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3001;
const prevNotes = [];


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "public/notes.html"))
);
app.get("/api/notes", (req, res) => {
    console.info(`${req.method} request received to get notes`);
    return res.json(db);
});
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received`);
    let response;
    if (req.body && req.body.title) {
        response = {
            status: 'success',
            data: req.body,
        };
        res.json(`Your note, ${req.body.title}, has been added!`);
    } else {
        res.json('Note must contain a title and text.');
    }
    console.log('note', req.body);
    const data = req.body
    console.log('db', db)
    console.log('data type', typeof data)
    db.push(data)
    db.map((note, index) => {
        note.id = index + 1
    });
    console.log('data', data)
});
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);