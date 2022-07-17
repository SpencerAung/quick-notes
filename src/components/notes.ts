import { nanoid } from "nanoid";
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
    timestamp: new Date().getTime()
  })
}
export function addBucket(buckets: Buckets, bucket: Bucket): Buckets {
  if (isBucketNameExists(buckets, bucket.name) || !bucket?.name) {
    return buckets;
  }

  return {
    ...buckets,
    [bucket.name]: bucket
  }
}

export function isBucketNameExists(buckets: Buckets, bucketName: string): boolean {
  return !!buckets[bucketName];
}

export function deleteBucket(buckets: Buckets, bucketName: string): Buckets {
  if (isBucketNameExists(buckets, bucketName)) {
    const newBuckets = { ...buckets }

    delete newBuckets[bucketName];

    return newBuckets;
  }

  return buckets;
}

export function overrideBucket(buckets: Buckets, bucket: Bucket): Buckets {
  return {
    ...buckets,
    [bucket.name]: bucket
  }
}

export function addNote(bucket: Bucket, note: Note): Bucket {
  return {
    ...bucket,
    notes: [...bucket.notes, note]
  }
}

export function removeNote(bucket: Bucket, removeId: string): Bucket {
  const notes = (bucket.notes || []).filter(({ id }) => id !== removeId)

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

export function getBucket(buckets: Buckets, bucketName: string): Bucket {
  return buckets[bucketName]
}

export function moveNote(buckets: Buckets, sourceName: string, destName:  string, noteId: string) : Buckets {
      const sourceBucket =getBucket(buckets, sourceName);
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
