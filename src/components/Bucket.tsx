import { useContext, useEffect, useState } from 'react';
import NoteContext from './NoteContext';
import Note from './Note';
import { Note as NoteType } from './types';
import Compose from './Compose';
import { IoTrash } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { AppContext } from './App';

const Bucket = ({ bucket }) => {
  const [isDropZoneActive, setDropZoneActive] = useState(false);
  const [isEditEnable, setIsEditEnable] = useState(false);
  const [, noteDispatch] = useContext(NoteContext);
  const [appState, appDispatch] = useContext(AppContext);
  const { notes = [], id, name } = bucket;

  const handleDeleteBucket = () => {
    noteDispatch({
      type: 'DELETE_BUCKET',
      bucketId: id
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
      source: appState?.drag?.sourceBucketId,
      dest: id,
      noteId: appState?.drag?.noteId,
    });
    appDispatch({
      type: 'NOTE_DROPPED',
    });
  }

  const showDropZone = appState.isDragStarted && appState?.drag.sourceBucketId !== id;

  const handleBucketRename = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newBucketName = form.get('newBucketName');
    console.log('newBucketName', newBucketName);
    noteDispatch({
      type: 'RENAME_BUCKET',
      newBucketName,
      bucketId: id
    });
    setIsEditEnable(false);
  }

  useEffect(() => {
    if (isEditEnable) {
      document.getElementById('newBucketName').focus();
    }
  }, [isEditEnable]);

  return (
    <div className={`p-2 bg-gray-800`}>
      <div className="w-full mb-2 flex flex-row justify-between items-center">
        <h2 className="flex items-center">
          {isEditEnable ? (
            <form onSubmit={handleBucketRename}>
              <input id="newBucketName" name="newBucketName" className="px-2 border bg-gray-700 text-white w-11/12" defaultValue={name} />
            </form>
          ) : (<span>{name}</span>
          )}
          <button className="ml-2 text-gray-500 opacity-0 hover:opacity-100"
            onClick={() => setIsEditEnable(true)}
          ><MdEdit /></button>
        </h2>
        <button
          className="px-2 py-1 text-gray-500"
          onClick={handleDeleteBucket}
        >
          <IoTrash />
        </button>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {(notes || []).map((note: NoteType) => (
          <Note key={note.id} note={note} bucketId={id} />
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
