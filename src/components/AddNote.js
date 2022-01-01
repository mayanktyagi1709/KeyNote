import React, {useState, useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes'

const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote} = context

    const [note, setNote] = useState({"title": "", "description": "", "tag": ""})
    const handleClick = (e) =>
    {
        e.preventDefault();   // preventing page reloading while adding note
        addNote(note.title, note.description, note.tag);
        setNote({id: "", etitle: "", edescription: "", etag: ""});
    }

    const handleChange = (e) =>
    {
        // [e.target.name] is to dynamically update object property 
        // (when the name of the property is unknown upfront but runtime). 
        // This way you could have multiple React inputs having a different name property 
        // and using the same onChange handler to update part of the state.

        // ...note = spread property https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        setNote({...note, [e.target.name]: e.target.value})   
    }
    return (
        <div>
            <h2>Add Your Note</h2>
            <div className="container my-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange} aria-describedby="emailHelp" minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange} required/>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
