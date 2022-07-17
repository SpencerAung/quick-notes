import { useContext } from "react"
import Bucket from "./Bucket";
import NoteContext from "./NoteContext"
import { toArray } from "./notes";

function Buckets() {
  const [state,] = useContext(NoteContext);
  const buckets = toArray(state.buckets);

  return (
    <div className="flex flex-wrap">
      {buckets.map((bucket) => (
      <div key={bucket.id} className="w-1/3 p-2">
        <Bucket key={bucket.id} bucket={bucket} />
        </div>
      ))}
    </div>
  )
}

export default Buckets
