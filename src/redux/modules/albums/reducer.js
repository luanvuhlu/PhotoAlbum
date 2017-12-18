import { RELOAD_ALBUM } from './actions';

const initialState = {
  reload: false,
};

export default function reducer(state = initialState, action) {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case RELOAD_ALBUM:
      return {
        ...state,
        reload: action.payload,
      };
    default:
      return state;
  }
}
