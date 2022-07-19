import { createContext, useEffect, useReducer } from 'react';
import CreateBucket from './CreateBucket';
import Buckets from './Buckets';
import NoteContext from './NoteContext';
import { noteReducer, initialState, initializer } from './NoteReducer';
import { AppReducer } from './AppReducer';

export const AppContext = createContext([]);
function App() {
  // @ts-ignore
  const reducer = useReducer(noteReducer, initialState, initializer);
  const appReducer = useReducer(AppReducer, {});
  const [,appDispatch] = appReducer;

  useEffect(() => {
    function allowDrop(e) {
      // prevent default to allow drop
      e.preventDefault();
    }
    function handleDragStart(e) {
      appDispatch({
        type: 'NOTE_DRAG_START',
        note: e.target.dataset.id,
        sourceBucketName: e.target.dataset.bucket,
      });
    }
    function handleDragEnd(e) {
      appDispatch({
        type: 'NOTE_DRAG_END'
      });
    }
    document.addEventListener('dragover', allowDrop);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('dragend', handleDragEnd);

    return () => {
      document.removeEventListener('dragover', allowDrop);
    document.removeEventListener('dragstart', handleDragStart);
    document.removeEventListener('dragend', handleDragEnd);
    }
  }, []);

  return (
    <AppContext.Provider value={appReducer}>
      <NoteContext.Provider value={reducer}>
        <div className={`font-sans bg-gray-900 text-white h-screen`}>
          <div className={`container mx-auto p-4 h-full w-auto flex flex-col`}>
            <div className="flex justify-between mb-4 items-center">
              <h1 className={`text-lg font-semibold mb-4 flex-1`}>Quick Notes</h1>
              <CreateBucket />
            </div>
            <Buckets />
          </div>
        </div>
      </NoteContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
