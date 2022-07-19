import { useContext, useState } from 'react';
import NoteContext from './NoteContext';
import Note from './Note';
import { Note as NoteType } from './types';
import Compose from './Compose';
import { IoTrash } from 'react-icons/io5';
import { AppContext } from './App';

const Bucket = ({ bucket }) => {
  const [isDropZoneActive, setDropZoneActive] = useState(false);
  const [, noteDispatch] = useContext(NoteContext);
  const [appState, appDispatch] = useContext(AppContext);
  const { notes = [], name } = bucket;

  const handleDeleteBucket = () => {
    noteDispatch({
      type: 'DELETE_BUCKET',
      bucketName: name
    })
  }
  const handleDragEnter = () => {
    setDropZoneActive(true);
  }
  const handleDragLeave = () => {
    setDropZoneActive(false);
  }
  const handleDrop = (e) => {
    e.preventDefault();
    noteDispatch({
      type: 'MOVE_NOTE',
      source: appState?.drag?.sourceBucketName,
      dest: name,
      noteId: appState?.drag?.noteId,
    });
    appDispatch({
      type: 'NOTE_DROPPED',
    });
  }

  const showDropZone = appState.isDragStarted && appState?.drag.sourceBucketName !== name;

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
        {showDropZone && (
          <div
            onDrop={handleDrop}
            className={`border border-dashed w-full h-[100px] ${isDropZoneActive ? 'bg-slate-600' : 'bg-slate-700'}`}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnter} />
        )}
        <Compose bucket={bucket} />
      </div>

    </div>
  )
};

export default Bucket;
