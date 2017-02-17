import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/app';
import About from '../components/about';
import Settings from '../components/settings';
import NotFound from '../components/notFound';
import ProjectManagement from '../components/projectManagement';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={ProjectManagement} />
        <Route path="about" component={About} />
        <Route path="settings" component={Settings} />
        <Route path="*" component={NotFound} />
    </Route>
);