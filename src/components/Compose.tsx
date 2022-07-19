import { useContext } from 'react';
import NoteContext from './NoteContext';

function Compose({ bucket }) {
  const [, dispatch] = useContext(NoteContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const note = formData.get('note') as string;


    dispatch({
      type: 'ADD_NOTE',
      bucketId: bucket.id,
      note,
    });
    form.reset();

  }

  return (
    <div className={`w-full`}>
      <form id="note-form" onSubmit={handleSubmit}
        className={`w-full flex flex-row gap-1 text-gray-900`}>
        <input type="text" name="note" placeholder="What's up?" autoComplete="off"
          className={`w-full max-h-16 p-2 bg-gray-900 text-white`} />
      </form>
    </div>
  )
}

export default Compose;
