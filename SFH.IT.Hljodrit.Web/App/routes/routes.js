import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/common/app';
import Login from '../components/common/login';
import Register from '../components/common/register';
import Intro from '../components/common/intro';
import NotFound from '../components/common/notFound';
import ProjectContainer from '../components/projects/projectContainer';
import Project from '../components/projects/project';
import CreateProject from '../components/projects/createProject/createProject';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="register" component={Register} />
        <Route path="intro" component={Intro} />
        <Route path="projects" component={ProjectContainer}>
            <IndexRoute component={Project} />
            <Route path="createproject" component={CreateProject} />
        </Route>
        <Route path="*" component={NotFound} />
    </Route>
);
