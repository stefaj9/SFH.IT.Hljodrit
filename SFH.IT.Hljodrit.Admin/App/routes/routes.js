import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/app';
import Settings from '../components/Settings/settings';
import Calculations from '../components/calculations';
import Instruments from '../components/instruments';
import Users from '../components/users';
import NotFound from '../components/notFound';
import Projects from '../components/projects';
import ProjectManagement from '../components/projectManagement';
import Intro from '../components/intro';
import AddProject from '../components/addProject';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Intro} />
        <Route path="projects" component={Projects}>
            <IndexRoute component={ProjectManagement} />
            <Route path="createproject" component={AddProject} />
        </Route>
        <Route path="calculations" component={Calculations} />
        <Route path="instruments" component={Instruments} />
        <Route path="users" component={Users} />
        <Route path="settings" component={Settings} />
        <Route path="*" component={NotFound} />
    </Route>
);