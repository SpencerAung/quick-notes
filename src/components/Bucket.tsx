import { useContext } from 'react';
import NoteContext from './NoteContext';
import { clearNotes, getDefaultBucketName } from './notes';
import Note from './Note';
import { Note as NoteType } from './types';

const Inbox = () => {
  const [notes, setNotes] = useContext(NoteContext);
  const handleClearNotes = () => {

    clearNotes(getDefaultBucketName());
    setNotes([]);
  }

  if (!notes?.length) {
    return null;
  }


  return (
    <div className={`flex flex-col m-4 gap-4 items-end w-1/2`}>
      <div className="w-full flex flex-row justify-between items-center">
        <h2>Inbox</h2>
        <button
          className="px-2 py-1 border border-slate-400"
          onClick={handleClearNotes}
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {(notes || []).map((note: NoteType) => (
          <Note key={note.id} note={note} />
        ))}
      </div>

    </div>
  )
};

export default Inbox;
