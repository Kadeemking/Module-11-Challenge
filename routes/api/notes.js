const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const { readAndAppend } = require("../../helpers/fsUtils");

// GET route to fetch all notes
router.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).json(err);
            return;
        }
        const notes = JSON.parse(data || "[]");
        res.json(notes);
    });
});

// // POST route to add a new note
router.post("/", (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = { id: uuidv4(), title, text };

        readAndAppend(newNote, path.join(__dirname, "../../db/db.json"));
        res.json({ message: "Note added successfully" });
    } else {
        res.status(400).json({ error: "Title and text are required" });
    }
});

// DELETE route to delete a note (BONUS)
router.delete("/:id", (req, res) => {
    const noteId = req.params.id;

    fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).json(err);
            return;
        }

        let notes = JSON.parse(data || "[]");

        const updatedNotes = notes.filter((note) => note.id !== noteId);

        fs.writeFile(
            path.join(__dirname, "../../db/db.json"),
            JSON.stringify(updatedNotes, null, 2),
            (writeErr) => {
                if (writeErr) {
                    console.error("Error writing file:", writeErr);
                    res.status(500).json(writeErr);
                    return;
                }

                res.json({ message: "Note deleted successfully" });
            }
        );
    });
});

module.exports = router;