import { useReducer } from 'react';
import CreateBucket from './CreateBucket';
import Buckets from './Buckets';
import NoteContext from './NoteContext';
import { noteReducer, initialState, initializer } from './NoteReducer';

function App() {
  // @ts-ignore
  const reducer = useReducer(noteReducer, initialState, initializer);

  return (
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
  );
}

export default App;
