import { useContext } from 'react';
import { addNote, createNote, getNotes, NOTES } from './notes';
import NoteContext from './NoteContext';

function NotePad() {

  const [, setNotes] = useContext(NoteContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const note = formData.get('note') as string;


    addNote(createNote(note), NOTES);
    setNotes(getNotes(NOTES));
    form.reset();

  }

  return (
    <div className={`w-full`}>
      <form id="note-form" onSubmit={handleSubmit}
        className={`w-full flex flex-row gap-1 bg-gray-800 text-gray-900`}>
        <textarea name="note" placeholder="What's up?"
          className={`w-full max-h-16 p-2`} />
        <button className={` bg-indigo-500 text-white py-2 px-4`}>Done</button>
      </form>
    </div>
  )
}

export default NotePad;
