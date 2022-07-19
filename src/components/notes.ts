import { nanoid } from "nanoid";
import { getBorderColorClassName } from "./colors";
import { Bucket, Buckets, Note } from "./types";

/**
  * NOTES
  */

export function createBucket(name: string): Bucket {
  return ({
    id: nanoid(),
    name: name,
    timestamp: new Date().getTime(),
    notes: []
  });
}
export function createNote(note: string): Note {
  return ({
    id: nanoid(),
    body: note,
    borderColorClassName: getBorderColorClassName(),
    timestamp: new Date().getTime()
  })
}
export function addBucket(buckets: Buckets, bucket: Bucket): Buckets {
  if (isBucketExists(buckets, bucket.id) || !bucket?.id) {
    return buckets;
  }

  return {
    ...buckets,
    [bucket.id]: bucket
  }
}

export function isBucketExists(buckets: Buckets, bucketId: string): boolean {
  return !!buckets[bucketId];
}

export function renameBucket(buckets: Buckets, bucketId: string, newBucketName: string): Buckets {
  if (isBucketExists(buckets, bucketId)) {
    const oldBucket = buckets[bucketId];
    return overrideBucket(buckets, { ...oldBucket, name: newBucketName });
  }

  return buckets;
}

export function deleteBucket(buckets: Buckets, bucketId: string): Buckets {
  if (isBucketExists(buckets, bucketId)) {
    const newBuckets = { ...buckets }

    delete newBuckets[bucketId];

    return newBuckets;
  }

  return buckets;
}

export function overrideBucket(buckets: Buckets, bucket: Bucket): Buckets {
  return {
    ...buckets,
    [bucket.id]: bucket
  }
}

export function addNote(bucket: Bucket, note: Note): Bucket {
  return {
    ...bucket,
    notes: [...bucket.notes, note]
  }
}

export function removeNote(bucket: Bucket, removeId: string): Bucket {
  const notes = (bucket?.notes || []).filter(({ id }) => id !== removeId)

  return {
    ...bucket,
    notes,
  }
}

export function clearNotes(bucket: Bucket): Bucket {
  return {
    ...bucket,
    notes: []
  }
}

export function getNotes(bucket: Bucket): Note[] {
  return bucket?.notes || []
}

export function getNote(bucket: Bucket, noteId: string): Note {
  return getNotes(bucket).filter(({ id }) => id === noteId)?.shift();
}

export function getBucket(buckets: Buckets, bucketId: string): Bucket {
  return buckets[bucketId]
}

export function moveNote(buckets: Buckets, sourceName: string, destName: string, noteId: string): Buckets {
  const sourceBucket = getBucket(buckets, sourceName);
  const destBucket = getBucket(buckets, destName);
  const note = getNote(sourceBucket, noteId);

  const newSource = removeNote(sourceBucket, noteId);
  const newDest = addNote(destBucket, note);

  return {
    ...buckets,
    [sourceName]: newSource,
    [destName]: newDest
  }
}

export function toArray(bucketsMap: Buckets): Bucket[] {
  const buckets = [];
  Object.keys(bucketsMap).forEach((key) => {
    buckets.push(bucketsMap[key]);
  });

  return buckets;
}
