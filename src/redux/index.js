import {combineReducers} from 'redux';
import albums from './modules/albums/reducer';
import network from './modules/network/reducer';

export default combineReducers({
    albums,
    network,
});
