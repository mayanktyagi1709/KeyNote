const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser')

// ROUTE-1 
// Fetch all the notes of a user using GET: "/api/notes/fetchalluser"- Login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {

  try {
    const notes = await Note.find({user: req.user.id})
    res.json(notes);
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Error Ocuured');
  }
  
});

// ROUTE-2 
// Add notes of a user using POST: "/api/notes/addnote"- Login required.
router.post('/addnote', fetchuser, [
  body("title", "Enter the title").isLength({ min: 3 }),
  body("description", "Enter the discription").isLength({min: 3})
], async (req, res) => {

  try {
    const {title, description, tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // creating a new note
    const note = new Note({
      title, description, tag, user: req.user.id
    });
    const savedNote = await note.save();

    res.json(savedNote);
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Error Ocuured');
  }
    
});

module.exports = router;
