import { combineReducers } from 'redux';
import ProjectReducer from './projectReducer';
import PersonReducer from './personReducer';
import OrganizationReducer from './organizationReducer';
import InstrumentReducer from './instrumentReducer';
import CommonReducer from './commonReducer';
import SettingsReducer from './settingsReducer';
import AlbumsReducer from './albumsReducer';
import FlowReducer from './flowReducer';
import MainArtistReducer from './mainArtistReducer';
import SongReducer from './songReducer';
import CacheReducer from './cacheReducer';
import {reducer as ToastrReducer} from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';
import AuthReducer from './authReducer';
import UserReducer from './userReducer';

export default combineReducers({
    routing: routerReducer,
    toastr: ToastrReducer,
    project: ProjectReducer,
    person: PersonReducer,
    common: CommonReducer,
    organization: OrganizationReducer,
    flow: FlowReducer,
    mainArtist: MainArtistReducer,
    instrument: InstrumentReducer,
    settings: SettingsReducer,
    songs: SongReducer,
    cache: CacheReducer,
    albums: AlbumsReducer,
    auth: AuthReducer,
    user: UserReducer
});
