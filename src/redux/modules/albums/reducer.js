import { ADD_PHOTO, VIEW_PHOTO, REMOVE_PHOTO } from './actions';

const initialState = {
  reload: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PHOTO:
      return {
        ...state,
        lastEditedImage: action.payload,
      };
    case VIEW_PHOTO:
      return {
        ...state,
        imageInfo: action.payload,
      };
  	case REMOVE_PHOTO:
	    return {
	      ...state,
	      removedImages: action.payload,
	    }
    default:
      return state;
  }
}
