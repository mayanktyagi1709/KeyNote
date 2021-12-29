import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = () => {
    const context = useContext(noteContext)
    const {notes, addNote} = context
    return (
        <>
            <AddNote/>
            <div className='row'>
                <h3>Your Notes</h3>
                {
                    // it will return title of every note
                    // "note" is just for iteration
                    notes.map((note) =>
                    {
                        return <NoteItem key={note._id} note = {note}/>
                    })
                }
            </div>
        </>
    )
}

export default Notes
