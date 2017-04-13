import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/common/app';
import Settings from '../components/settings/settings';
import Calculations from '../components/calculations/calculations';
import AlbumContainer from '../components/albums/albumContainer';
import Albums from '../components/albums/albums';
import Users from '../components/users/users';
import NotFound from '../components/common/notFound';
import Projects from '../components/project/projects';
import ProjectManagement from '../components/project/projectManagement';
import Intro from '../components/common/intro';
import AddProject from '../components/project/addProject';
import Songs from '../components/songs/songs';
//import Media from '../components/media/media';
import AlbumDetailsContainer from '../components/albums/albumDetailsContainer';
import AlbumDetails from '../components/albums/albumDetails';
import SongDetails from '../components/songs/songDetails';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Intro} />
        <Route path="projects" component={Projects}>
            <IndexRoute component={ProjectManagement} />
            <Route path="createproject" component={AddProject} />
        </Route>
        <Route path="calculations" component={Calculations} />
        <Route path="albums" component={AlbumContainer}>
            <IndexRoute component={Albums} />
            <Route path=":albumId" component={AlbumDetailsContainer}>
                <IndexRoute component={AlbumDetails} />
                <Route path="songs/:songId" component={SongDetails} />
            </Route>
        </Route>
        <Route path="users" component={Users} />
        <Route path="settings" component={Settings} />
        <Route path="songs" component={Songs} />
        <Route path="*" component={NotFound} />
    </Route>
);
