import React, { useContext } from 'react'
import { Note as NoteType } from './types'
import { IoClose } from 'react-icons/io5'
import NoteContext from './NoteContext';

const Note: React.FC<{ note: NoteType }> = ({ note }) => {
  const [state,dispatch ] = useContext(NoteContext);

  const handleRemove =(noteId: string) => {
    const bucketName = state.selectedBucket;
    dispatch({
      type: 'REMOVE_NOTE',
      bucketName,
      noteId
    })
  }

  return (
    <div draggable
    className="w-full border border-orange-300 p-4 flex flex-row justify-between items-start gap-4">
      <div>
        {note.body}
      </div>
      <div className="flex flex-row justify-end">
        <button onClick={() => handleRemove(note.id)} className="text-gray-500"><IoClose /></button>
      </div>
    </div>
  )
}

export default Note;
