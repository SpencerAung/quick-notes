import { useContext } from 'react';
import NoteContext from './NoteContext';
import Note from './Note';
import { Note as NoteType } from './types';
import Compose from './Compose';
import { IoTrash } from 'react-icons/io5';

const Bucket = ({ bucket }) => {
  const [, dispatch] = useContext(NoteContext);
  const { notes = [], name } = bucket;
  const handleDeleteBucket = () => {

    dispatch({
      type: 'DELETE_BUCKET',
      bucketName: name
    })
  }

  return (
    <div className={`p-2 bg-gray-800`}>
      <div className="w-full mb-2 flex flex-row justify-between items-center">
        <h2>{name}</h2>
        <button
          className="px-2 py-1 text-gray-500"
          onClick={handleDeleteBucket}
        >
          <IoTrash />
        </button>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {(notes || []).map((note: NoteType) => (
          <Note key={note.id} note={note} bucketName={name} />
        ))}
        <Compose bucket={bucket} />
      </div>

    </div>
  )
};

export default Bucket;
