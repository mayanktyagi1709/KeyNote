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

// ROUTE-3 
// Update an existing note using PUT: "/api/notes/updatenote"- Login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => {

  try {
    const {title, description, tag} = req.body;

    // creating an empty object
    const newNote = {};
    // if user is sending an updated title or desc or tag, then add it to this empty object
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // find the id of the note to be updated
    let note = await Note.findById(req.params.id);
    // if note does not exist
    if(!note){return res.status(404).send("Not found")};
    // if the id of the note does not match the id of user requesting the update
    if(note.user.toString() !== req.user.id)
    {
      return res.status(401).send("Not allowed");
    }
    // if everything is fine, update the note 
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({note});
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Error Ocuured');
  }
  
});

// ROUTE-4 
// Delete an existing note using DELETE: "/api/notes/deletenote"- Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

  try {
    // find the id of the note to be deleted
    let note = await Note.findById(req.params.id);
    // if note does not exist
    if(!note){return res.status(404).send("Not found")};
    // if the id of note's user does not match the id of user requesting the update
    if(note.user.toString() !== req.user.id)
    {
      return res.status(401).send("Not allowed");
    }
    // if everything is fine, delete the note 
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note has been deleted", note:note});
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Error Ocuured');
  }
  
});

module.exports = router;
