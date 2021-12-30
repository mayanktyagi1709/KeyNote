import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  // Get a note
  const getNote = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNmE0N2U2MzBhYzgwODJhZTc3NWEwIn0sImlhdCI6MTY0MDQwODE5MH0.YEKlfd6YvgdKWkIoSdVCJf6M0F9KxFrFUyg4ZbsqqcI",
      }
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  // Add a note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNmE0N2U2MzBhYzgwODJhZTc3NWEwIn0sImlhdCI6MTY0MDQwODE5MH0.YEKlfd6YvgdKWkIoSdVCJf6M0F9KxFrFUyg4ZbsqqcI",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    // Add note to the client side
    const note = [
      {
        _id: "61c80a71bf8db5b9e83f3b4d",
        user: "61c6a47e630ac8082ae775a0",
        title: title,
        description: description,
        tag: tag,
        date: "2021-12-26T06:23:45.864Z",
        __v: 0,
      },
    ];
    // pushing the newly created note in the "notes" array and returning it
    setNotes(notes.concat(note));
  };
  // Delete a note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNmE0N2U2MzBhYzgwODJhZTc3NWEwIn0sImlhdCI6MTY0MDQwODE5MH0.YEKlfd6YvgdKWkIoSdVCJf6M0F9KxFrFUyg4ZbsqqcI",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
