import { useContext } from "react";
import NoteContext from "./NoteContext";

function CreateBucket() {

const [, dispatch] = useContext(NoteContext);
  const handleCreateBucket = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const bucketName = formData.get('bucketName') as string;

    dispatch({
      type: 'ADD_BUCKET',
      bucketName,
    })

    form.reset();
  }

  return (
    <div>
      <form onSubmit={handleCreateBucket}>
        <input type="text" className="max-h-16 p-2 bg-gray-800 text-white" name="bucketName" placeholder="Bucket name" autoComplete="off"/>
        <button
          className="bg-indigo-500 text-white px-4 py-2"
          >Create Bucket</button>
      </form>
    </div>
  )
}

export default CreateBucket;
