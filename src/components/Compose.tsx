import { useContext } from 'react';
import NoteContext from './NoteContext';
import { toArray } from './notes';

function Compose() {
  const [state, dispatch] = useContext(NoteContext);
  const buckets = toArray(state.buckets);
  const selectedBucket = state.selectedBucket;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const note = formData.get('note') as string;

    const bucketName = state.selectedBucket;

    dispatch({
      type: 'ADD_NOTE',
      bucketName,
      note,
    });
    form.reset();

  }
  // const selectedInbox = getSelectedBucketName();

  return (
    <div className={`w-full`}>
      <form id="note-form" onSubmit={handleSubmit}
        className={`w-full flex flex-row gap-1 bg-gray-800 text-gray-900`}>
        <select className="w-1/5 min-w-fit" defaultValue={selectedBucket}>
          {buckets.map(({ id, name }) => (
            <option key={id} value={name} >{name}</option>
          ))}
        </select>
        <input type="text" name="note" placeholder="What's up?"
          className={`w-full max-h-16 p-2`} />
      </form>
    </div>
  )
}

export default Compose;
