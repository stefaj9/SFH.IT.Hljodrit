import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/common/app';
import Settings from '../components/settings/settings';
import Calculations from '../components/calculations/calculations';
import AlbumContainer from '../components/albums/albumContainer';
import Albums from '../components/albums/albums';
import MusiciansContainer from '../components/musicians/musiciansContainer';
import Musicians from '../components/musicians/musicians';
import MusicianDetails from '../components/musicians/musicianDetails';
import NotFound from '../components/common/notFound';
import Projects from '../components/project/projects';
import ProjectManagement from '../components/project/projectManagement';
import Intro from '../components/common/intro';
//import AddProject from '../components/project/addProject';
import PublishersContainer from '../components/publishers/publishersContainer';
import Publishers from '../components/publishers/publishers';
import AddAlbum from '../components/albums/createAlbum/addAlbum';
import MediaContainer from '../components/media/mediaContainer';
import Media from '../components/media/media';
import MediaDetails from '../components/media/mediaDetails';
import AlbumDetailsContainer from '../components/albums/albumDetailsContainer';
import AlbumDetails from '../components/albums/albumDetails';
import SongDetails from '../components/songs/songDetails';
import PublisherDetails from '../components/publishers/publisherDetails';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Intro} />
        <Route path="projects" component={Projects}>
            <IndexRoute component={ProjectManagement} />
        </Route>
        <Route path="calculations" component={Calculations} />
        <Route path="albums" component={AlbumContainer}>
            <IndexRoute component={Albums} />
            <Route path="createalbum" component={AddAlbum} />
            <Route path=":albumId" component={AlbumDetailsContainer}>
                <IndexRoute component={AlbumDetails} />
                <Route path="songs/:songId" component={SongDetails} />
            </Route>
        </Route>
        <Route path="musicians" component={MusiciansContainer}>
            <IndexRoute component={Musicians} />
            <Route path=":musicianId" component={MusicianDetails} />
        </Route>
        <Route path="settings" component={Settings} />
        <Route path="media" component={MediaContainer}>
            <IndexRoute component={Media}/>
            <Route path=":mediaId" component={MediaDetails} />
        </Route>
        <Route path="publishers" component={PublishersContainer}>
            <IndexRoute component={Publishers}/>
            <Route path=":publisherId" component={PublisherDetails} />
        </Route>
        <Route path="*" component={NotFound} />
    </Route>
);
