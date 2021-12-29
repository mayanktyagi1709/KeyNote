import React, {useState, useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote} = context

    const [note, setNote] = useState({"title": "", "description": "", "tag": "default"})
    const handleClick = (e) =>
    {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
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
                        <input type="text" className="form-control" id="title" name="title" onChange={handleChange} aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={handleChange}/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
