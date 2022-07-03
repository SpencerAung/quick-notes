import React, { useContext } from 'react'
import { Note as NoteType } from './types'
import { IoClose } from 'react-icons/io5'
import NoteContext from './NoteContext';
import { removeNote, getNotes, NOTES } from './notes';

const Note: React.FC<{ note: NoteType }> = ({ note }) => {
  const [,setNotes ] = useContext(NoteContext);

  const handleRemove =(id: string) => {
    removeNote(id, NOTES);
    setNotes(getNotes(NOTES));
  }

  return (
    <div draggable
    className="w-full border border-orange-300 p-4 flex flex-row justify-between items-start gap-4">
      <div>
        {note.body}
      </div>
      <div className="flex flex-row justify-end">
        <button onClick={() => handleRemove(note.id)}><IoClose /></button>
      </div>
    </div>
  )
}

export default Note;
