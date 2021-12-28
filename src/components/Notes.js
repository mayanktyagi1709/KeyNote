import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'

const Notes = () => {
    const context = useContext(noteContext)
    const {notes, setNotes} = context
    return (
        <div className='row'>
            <h3>Your Notes</h3>
            {
                // it will return title of every note
                // "note" is just for iteration
                notes.map((note) =>
                {
                    return <NoteItem note = {note}/>
                })
            }
        </div>
    )
}

export default Notes
