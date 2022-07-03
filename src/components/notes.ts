import { nanoid } from 'nanoid';
import { Note } from './types'

export const NOTES = 'notes';
export const DONES = 'dones';

export function get(key: string) {
  return localStorage.getItem(key);
}
export function set(key: string, value: any) {
  return localStorage.setItem(key, JSON.stringify(value));
}
export function remove(key: string) {
  return localStorage.removeItem(key);
}

export function createNote(note: string): Note {
  return ({
    id: nanoid(),
    body: note,
    timestamp: new Date().getTime()
  })
}

export function isBucketExists(name: string) {
  return !!get(name);
}

export function createBucket(name: string) {
  if(isBucketExists(name)) {
    return false;
  }
  set(name, '[]');

  return true;
}


export function addNote(note: Note, bucketName: string) {
  const bucket = getNotes(bucketName);
  console.log(bucket);
  const newBacket = [...bucket, note];

  set(bucketName, newBacket);
}

export function getNotes(source: string): Note[] {
  const raw = get(source);

  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw);
  } catch {
    return []
  }
}

export function clearNotes(bucket: string) {
  remove(bucket);
}

export function removeNote(removeId: string, source: string) {
  const notes = getNotes(source);
  const newNotes = (notes || []).filter(({ id }) => id !== removeId)

  set(NOTES, newNotes);

}

export function getNote(id: string, source: string) {
  const notes = getNotes(source);

  const filtered = notes.filter((note) => note.id === id); 
  
  return filtered[0];
}

export function moveNote(id: string, source: string, dest: string) {
  const note = getNote(id, source);

  removeNote(id, source);
  addNote(note, dest);
}
