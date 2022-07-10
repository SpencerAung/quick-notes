import { nanoid } from 'nanoid';
import { Store, Bucket, Buckets, Note } from './types'

const STORE_KEY = 'store';
const DEFAULT_BUCKET_NAME = 'inbox';
const SELECTED_BUCKET_NAME_KEY = 'selected_bucket_name';
const BUCKETS_KEY = 'buckets';

/**
  * Store
*/
export function createStore(defaultBucket: Bucket): Store {
  return {
    [SELECTED_BUCKET_NAME_KEY]: defaultBucket.name,
    [BUCKETS_KEY]: {
      [defaultBucket.id]: defaultBucket,
    }
  }
}

export class MemStore {
  private store: Store;

  constructor(defaultStore?: Store) {
    this.load(defaultStore);
  }

  private load(defaultStore?: Store) {
    const localStore = localStorageGet(STORE_KEY);
    if (!localStore) {
      const store = defaultStore || createStore(createBucket(DEFAULT_BUCKET_NAME));
      localStorageSet(STORE_KEY, store);
      this.store = store;
    } else {
      this.store = localStore;
    }
  }

  get(key: string) {
    console.log('reading from memStore');
    return this.store[key];
  }

  set(key: string, value: any) {
    console.log('writing to memStore');
    this.store[key] = value;
    localStorageSet(STORE_KEY, this.store);
  }
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


export function getStore() {
  if (!window?.quicknotes?.store) {
    window.quicknotes = {};
    window.quicknotes.store = new MemStore();
  }

  return window.quicknotes.store;
}
/**
 * Bucket
 */
export function setBuckets(buckets: Buckets) {
  getStore().set(BUCKETS_KEY, buckets);
}
export function getBuckets(): Buckets {
  return getStore().get(BUCKETS_KEY) || {};
}

export function getDefaultBucketName() {
  return DEFAULT_BUCKET_NAME;
}

export function getSelectedBucketName() {
  return getStore().get(SELECTED_BUCKET_NAME_KEY) || DEFAULT_BUCKET_NAME;
}

export function updateSelectedBucket(name: string) {
  return getStore().get(SELECTED_BUCKET_NAME_KEY, name);
}

export function getBucketsArray(): Bucket[] {
  const bucketsMap = getBuckets() || {};

  const buckets = [];
  Object.keys(bucketsMap).forEach((key) => {
    buckets.push(bucketsMap[key]);
  });

  return buckets;
}

export function isBucketNameExists(bucketName: string) {
  const buckets = getBucketsArray();

  const filteredResult = buckets.filter(({ name }) => name === bucketName);

  return filteredResult.length > 0;

}

export function createBucket(name: string): Bucket {
  return ({
    id: nanoid(),
    name: name,
    timestamp: new Date().getTime(),
    notes: []
  });
}

export function addBucket(bucket: Bucket) {
  const buckets = getBuckets();

  buckets[bucket.id] = bucket;

  setBuckets(buckets);
}

export function getBucketByName(bucketName: string): Bucket {
  const buckets = getBucketsArray();
  const filteredResult = (buckets || []).filter(({ name }) => name === bucketName);

  return filteredResult?.[0];
}

export function setBucket(id: string, bucket: Bucket) {
  const buckets = getBuckets();

  buckets[id] = bucket;
  setBuckets(buckets);
}


/**
  * Notes
  *
  */
export function createNote(note: string): Note {
  return ({
    id: nanoid(),
    body: note,
    timestamp: new Date().getTime()
  })
}
export function addNote(note: Note, bucketName: string) {
  const bucket = getBucketByName(bucketName);

  if (bucket) {
    bucket.notes = [...bucket.notes, note];

    setBucket(bucket.id, bucket);
  }
}

export function getNotes(bucketName: string): Note[] {
  const bucket = getBucketByName(bucketName);

  return bucket?.notes || [];
}

export function clearNotes(bucketName: string) {
  const bucket = getBucketByName(bucketName);
  if (bucket) {
    bucket.notes = [];
    setBucket(bucket.id, bucket);
  }
}

export function removeNote(removeId: string, bucketName: string) {
  const bucket = getBucketByName(bucketName);
  if (bucket) {
    bucket.notes = (bucket.notes || []).filter(({ id }) => id !== removeId)
    setBucket(bucket.id, bucket);
  }
}

export function getNote(id: string, bucketName: string) {
  const bucket = getBucketByName(bucketName);

  if (bucket) {
    const filtered = (bucket.notes || []).filter((note) => note.id === id);

    return filtered[0];
  }
}

export function moveNote(id: string, source: string, dest: string) {
  const note = getNote(id, source);

  removeNote(id, source);
  addNote(note, dest);
}
