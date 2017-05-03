import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/common/app';
import AuthAppContainer from '../components/common/authAppContainer';
import Login from '../components/common/login';
import Info from '../components/common/info';
import Register from '../components/common/register';
import Intro from '../components/common/intro';
import NotFound from '../components/common/notFound';
import ProjectContainer from '../components/projects/projectContainer';
import Project from '../components/projects/project';
import ProjectDetails from '../components/projects/projectDetails';
import CreateProject from '../components/projects/createProject/createProject';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="info" component={Info} />
        <Route path="register" component={Register} />
        <Route path="app" component={AuthAppContainer}>
            <IndexRoute component={Intro} />
            <Route path="projects" component={ProjectContainer}>
                <IndexRoute component={Project} />
                <Route path="createproject" component={CreateProject} />
                <Route path=":projectId" component={ProjectDetails} />
            </Route>
        </Route>
        <Route path="*" component={NotFound} />
    </Route>
);
