import { combineReducers } from 'redux';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';
import ProjectReducer from './projectReducer';
import CommonReducer from './commonReducer';
import MainArtistReducer from './mainArtistReducer';
import FlowReducer from './flowReducer';

export default combineReducers({
    routing: routerReducer,
    toastr: ToastrReducer,
    project: ProjectReducer,
    common: CommonReducer,
    mainArtist: MainArtistReducer,
    flow: FlowReducer
});
