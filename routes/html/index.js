const router= require("express").Router();
const path= require("path");

//http://localhost:3001/notes
router.get("/notes", (req,res) =>{
    res.sendFile(path.join(__dirname,"../../public/notes.html"))
});

//http://localhost:3001/*
router.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname,"../../public/notes.html"))
});

module.exports= router;