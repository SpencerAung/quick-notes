import { useState } from 'react';
import NotePad from './NotePad';
import Inbox from './Inbox';
import NoteContext from './NoteContext';
import { getNotes, NOTES } from './notes';

function App() {
  const noteState = useState(getNotes(NOTES));

  return (
    <NoteContext.Provider value={noteState}>
      <div className={`font-sans bg-gray-900 text-white h-screen`}>
        <div className={`container mx-auto p-4 h-full`}>
          <h1 className={`text-lg font-semibold mb-4`}>Quick Notes</h1>
          <div className="mb-4">
            <NotePad />
          </div>
          <div className={`flex flex-row`}>
            <Inbox />
          </div>
        </div>
      </div>
    </NoteContext.Provider>
  );
}

export default App;
