import { combineReducers } from 'redux';
import {reducer as ToastrReducer} from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    toastr: ToastrReducer
});
