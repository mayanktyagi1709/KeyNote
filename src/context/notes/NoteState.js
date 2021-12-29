import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>
{
    const noteInitial = [
        {
          "_id": "61c806c58db0bd0102bc9031",
          "user": "61c6a47e630ac8082ae775a0",
          "title": "First note",
          "description": "This is my first note",
          "tag": "personal",
          "date": "2021-12-26T06:08:05.387Z",
          "__v": 0
        },
        {
          "_id": "61c80a71bf8db5b5e83f3b4d",
          "user": "61c6a47e630ac8082ae775a0",
          "title": "First note",
          "description": "This is my first note",
          "tag": "personal",
          "date": "2021-12-26T06:23:45.864Z",
          "__v": 0
        },
        {
          "_id": "61c80a73bf8db5b5e83f3b4d",
          "user": "61c6a47e630ac8082ae775a0",
          "title": "First note",
          "description": "This is my first note",
          "tag": "personal",
          "date": "2021-12-26T06:23:45.864Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(noteInitial)

      // Add a note
      const addNote = (title, description, tag) =>
      {
        // created a new note to add
        const note = [
          {
            "_id": "61c80a71bf8db5b9e83f3b4d",
            "user": "61c6a47e630ac8082ae775a0",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-12-26T06:23:45.864Z",
            "__v": 0
          }
        ]
        // pushing the newly created note in the "notes" array and returning it
        setNotes(notes.concat(note));
      }
      // Delete a note
      const deleteNote = (id) =>
      {
        const newNotes = notes.filter((note) => {return note._id!==id})
        setNotes(newNotes)
      }
      // Edit a note
      const editNote = () =>
      {
          
      }

      return(
        <noteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;