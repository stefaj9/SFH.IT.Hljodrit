import { combineReducers } from 'redux';
import ProjectReducer from './projectReducer';
import PersonReducer from './personReducer';
import OrganizationReducer from './organizationReducer';
import InstrumentReducer from './instrumentReducer';
import CommonReducer from './commonReducer';
import SettingsReducer from './settingsReducer';
import FlowReducer from './flowReducer';
import {reducer as ToastrReducer} from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    routing: routerReducer,
    toastr: ToastrReducer,
    project: ProjectReducer,
    person: PersonReducer,
    common: CommonReducer,
    organization: OrganizationReducer,
    flow: FlowReducer,
    instrument: InstrumentReducer,
    settings: SettingsReducer
});