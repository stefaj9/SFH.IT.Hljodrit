import { combineReducers } from 'redux';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';
import ProjectReducer from './projectReducer';
import CommonReducer from './commonReducer';
import MainArtistReducer from './mainArtistReducer';
import FlowReducer from './flowReducer';
import OrganizationReducer from './organizationReducer';
import SongReducer from './songReducer';
import CacheReducer from './cacheReducer';
import PersonReducer from './personReducer';
import InstrumentReducer from './instrumentReducer';
import AuthReducer from './authReducer';

export default combineReducers({
    routing: routerReducer,
    toastr: ToastrReducer,
    project: ProjectReducer,
    common: CommonReducer,
    mainArtist: MainArtistReducer,
    flow: FlowReducer,
    organization: OrganizationReducer,
    songs: SongReducer,
    cache: CacheReducer,
    person: PersonReducer,
    instrument: InstrumentReducer,
    auth: AuthReducer
});
