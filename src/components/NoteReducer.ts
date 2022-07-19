import { addBucket, addNote, clearNotes, createBucket, createNote, deleteBucket, moveNote, overrideBucket, removeNote, renameBucket } from "./notes";
import { Store } from "./types";

const STORE_KEY = 'store';

const inboxBucket = createBucket('Inbox');
export const initialState = {
  buckets: {
    [inboxBucket.id]: inboxBucket,
  }
}

export function initializer(initialState: Store): Store {
  return localStorageGet(STORE_KEY) || initialState;
}

export function localStorageGet(key: string) {
  console.log('reading from localStorage');
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return null;
  }
}

export function localStorageSet(key: string, value: any) {
  console.log('writing to localStorage');
  return localStorage.setItem(key, JSON.stringify(value));
}

export function localStorageRemove(key: string) {
  return localStorage.removeItem(key);
}

export function saveToStorage(store: Store) {
  localStorageSet(STORE_KEY, store);
}

export function noteReducer(store: Store, action: { [key: string]: any }) {
  console.log(store,action);
  switch (action.type) {
    case 'ADD_BUCKET': {
      const bucket = createBucket(action.bucketName);
      const updated = {
        ...store,
        buckets: addBucket(store.buckets, bucket)
      }

      saveToStorage(updated);
      return updated;
    }
    case 'RENAME_BUCKET': {
      const updated = {
        ...store,
        buckets: renameBucket(store.buckets, action.bucketId, action.newBucketName),
      }
      console.log('updated', updated);
      saveToStorage(updated);
      return updated;
    }
    case 'DELETE_BUCKET': {
      const updated = {
        ...store,
        buckets: deleteBucket(store.buckets, action.bucketId)
      }
      saveToStorage(updated);
      return updated;
    }
    case 'ADD_NOTE': {
      const {buckets } = store;
      const { bucketId, note } = action;
      const updated = {
        ...store,
        buckets: {
          ...buckets,
          [bucketId]: addNote(buckets[bucketId], createNote(note))
        }
      }
      saveToStorage(updated);
      return updated;
    }
    case 'REMOVE_NOTE': {
      const updated = {
        ...store,
        buckets: overrideBucket(store?.buckets, removeNote(store?.buckets[action?.bucketId], action.noteId))
      }
      saveToStorage(updated);
      return updated;
    }
    case 'CLEAR_NOTES': {
      const updated = {
        ...store,
        buckets: overrideBucket(store.buckets, clearNotes(store.buckets[action.bucketId]))
      }

      saveToStorage(updated);
      return updated;
    }
    case 'MOVE_NOTE': {
      const { source, dest, noteId } = action;
      const updated = {
        ...store,
        buckets: moveNote(store.buckets, source, dest, noteId)
      }
      saveToStorage(updated);
      return updated;
    }
    default: {
      return store;
    }
  }
}
