import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/common/app';
import Intro from '../components/common/intro';
import NotFound from '../components/common/notFound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Intro} />
        <Route path="*" component={NotFound} />
    </Route>
);
