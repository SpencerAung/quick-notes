export interface Note {
  id: string;
  body: string;
  timestamp: number;
}

export interface Bucket {
  id: string;
  name: string;
  notes: Note[];
  timestamp: number;
}

export type Buckets = {
  [key: string]: Bucket;
}
export interface Store {
  [key: string]: any;
}
