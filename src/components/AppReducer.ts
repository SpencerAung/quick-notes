
export function AppReducer(state, action) {
  console.log(action);
  switch(action.type) {
    case 'NOTE_DRAG_START': {
      return {
        ...state,
        isDragStarted: true,
        drag: {
          noteId: action.note,
          sourceBucketId: action.sourceBucketId,
        }
      };
    }
    case 'NOTE_DRAG_END': {
      return {
        ...state,
        isDragStarted: false,
      }
    }
    case 'NOTE_DROPPED': {
      return {
        ...state,
        isDragStarted: false,
        drag: {
          noteId: null,
          sourcBucketName: null
        }
      }
    }
    default: {
      return state;
    }
  }
}
