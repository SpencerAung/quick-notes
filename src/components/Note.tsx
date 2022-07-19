import React, { useContext } from 'react'
import { Note as NoteType } from './types'
import { IoClose } from 'react-icons/io5'
import NoteContext from './NoteContext';

const Note: React.FC<{ note: NoteType, bucketId: string }> = ({ note, bucketId }) => {
  const [, dispatch] = useContext(NoteContext);

  const handleRemove = (noteId: string) => {
    dispatch({
      type: 'REMOVE_NOTE',
      bucketId,
      noteId
    })
  }

  return (
    <div draggable
      data-id={note.id}
      data-bucket={bucketId}
      className={`w-full border ${note?.borderColorClassName} p-4 flex flex-row justify-between items-start gap-4`}>
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
