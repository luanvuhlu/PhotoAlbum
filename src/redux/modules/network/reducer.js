import {NETWORK_CHANGE} from './actions';

const initialState = {
    isOnline: null,
    isOffline: null,
};

export default function reducer(state = initialState, action){
    switch(action.type){
        case NETWORK_CHANGE:
            return {
                ...state,
                ...action.payload,
            };
            default:
               return state;
    }
}