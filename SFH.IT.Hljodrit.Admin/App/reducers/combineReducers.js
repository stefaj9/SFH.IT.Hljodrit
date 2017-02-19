import { combineReducers } from 'redux';
import ProjectReducer from './projectReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    project: ProjectReducer
});