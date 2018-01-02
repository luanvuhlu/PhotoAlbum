import {createStore, combineReducers} from 'redux';
import albums from './modules/albums/reducer';
import network from './modules/network/reducer';

const reducers = combineReducers({
	albums,
	network,
});

const store = createStore(reducers);

export default store;
