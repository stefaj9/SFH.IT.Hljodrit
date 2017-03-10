import { combineReducers } from 'redux';
import ProjectReducer from './projectReducer';
import PersonReducer from './personReducer';
import CommonReducer from './commonReducer';
import SettingsReducer from './settingsReducer';
import {reducer as ToastrReducer} from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    toastr: ToastrReducer,
    project: ProjectReducer,
    person: PersonReducer,
    common: CommonReducer,
    settings: SettingsReducer
});