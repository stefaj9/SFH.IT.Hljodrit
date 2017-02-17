import React from 'react';
import ProjectSearchBar from './projectSearchBar';
import ProjectFilter from './projectFilter';
import ProjectListView from './projectListView';

export default class ProjectManagement extends React.Component {
    render() {
        return (
            <div>
                <h2>Verkefnastýring</h2>
                <ProjectSearchBar />
                <ProjectFilter />
                <ProjectListView />
            </div>
        );
    }
}
