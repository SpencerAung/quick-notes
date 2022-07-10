import { useContext } from 'react';
import { getSelectedBucketName,addNote, createNote, getNotes, getDefaultBucketName } from './notes';
import NoteContext from './NoteContext';

function Compose() {

  const [, setNotesContext] = useContext(NoteContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const note = formData.get('note') as string;

    const bucketName = getSelectedBucketName() || getDefaultBucketName();

    addNote(createNote(note), bucketName);
    setNotesContext(getNotes(bucketName));
    form.reset();

  }
  // const selectedInbox = getSelectedBucketName();

  return (
    <div className={`w-full`}>
      <form id="note-form" onSubmit={handleSubmit}
        className={`w-full flex flex-row gap-1 bg-gray-800 text-gray-900`}>
        <div>
          <div>
          <select>

          </select>
          </div>
          <input type="text" name="note" placeholder="What's up?"
            className={`w-full max-h-16 p-2`} />
        </div>
      </form>
    </div>
  )
}

export default Compose;
