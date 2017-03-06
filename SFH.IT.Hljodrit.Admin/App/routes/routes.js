import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/common/app';
import Settings from '../components/settings/settings';
import Calculations from '../components/calculations/calculations';
import Instruments from '../components/instruments/instruments';
import Users from '../components/users/users';
import NotFound from '../components/common/notFound';
import Projects from '../components/project/projects';
import ProjectManagement from '../components/project/projectManagement';
import Intro from '../components/common/intro';
import AddProject from '../components/project/addProject';

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