import { useReducer } from 'react';
import Compose from './Compose';
import CreateBucket from './CreateBucket';
import Bucket from './Bucket';
import NoteContext from './NoteContext';
import { noteReducer, initialState, initializer } from './NoteReducer';

function App() {
  // @ts-ignore
  const reducer = useReducer(noteReducer, initialState, initializer);

  return (
    <NoteContext.Provider value={reducer}>
      <div className={`font-sans bg-gray-900 text-white h-screen`}>
        <div className={`container mx-auto p-4 h-full w-auto flex flex-col`}>
          <h1 className={`text-lg font-semibold mb-4`}>Quick Notes</h1>
          <div className="mb-4">
            <Compose />
          </div>
          <div className={`flex flex-row flex-1`}>
            <Bucket />
          </div>
          <div className="flex justify-end self-end ">
            <CreateBucket />
          </div>
        </div>
      </div>
    </NoteContext.Provider>
  );
}

export default App;
