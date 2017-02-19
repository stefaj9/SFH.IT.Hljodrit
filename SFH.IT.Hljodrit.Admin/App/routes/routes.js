import React from 'react';
import { Route } from 'react-router';
import App from '../components/app';
import Settings from '../components/settings';
import Calculations from '../components/calculations';
import Instruments from '../components/instruments';
import Users from '../components/users';
import NotFound from '../components/notFound';
import ProjectManagement from '../components/projectManagement';

export default (
    <Route path="/" component={App}>
        <Route path="projects" component={ProjectManagement} />
        <Route path="calculations" component={Calculations} />
        <Route path="instruments" component={Instruments} />
        <Route path="users" component={Users} />
        <Route path="settings" component={Settings} />
        <Route path="*" component={NotFound} />
    </Route>
);