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
        }
      ]
      const [notes, setNotes] = useState(noteInitial)
    return(
        <noteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;