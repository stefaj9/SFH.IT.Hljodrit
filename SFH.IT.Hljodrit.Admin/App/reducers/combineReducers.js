import { combineReducers } from 'redux';
import ProjectManagementReducer from './projectManagementReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    projectManagement: ProjectManagementReducer
});