import React from 'react';
import ProjectItem from './projectItem';

export default class ProjectListView extends React.Component {
    renderProjectItems() {
        return this.props.projects.map((item) => {
            return (
                <ProjectItem key={item.name} name={item.name} author={item.author} submissionUser={item.submissionUser} />
            );
        });
    }
    render() {
        return (
            <div>
                {this.renderProjectItems()}
            </div>
        );
    }
}