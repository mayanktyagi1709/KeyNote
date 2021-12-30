import React , {useContext}from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote} = context;

    // notes is passed from Notes.js and it contains the information 
    // like title, description, and tag of a note.
    // We are iterating over each note in Notes.js and passing note as a prop
    const {note} = props
    return (
        <div className="col-md-3">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <span
                        className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                        style={{ left: "90%", zIndex: "1" }}
                        >
                        {note.tag}
                    </span>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fas fa-trash mx-3" onClick = {()=>{deleteNote(note._id)}}></i>
                        <i className="fas fa-edit mx-3"></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
