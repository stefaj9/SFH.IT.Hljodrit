import React from 'react';
import ProjectItem from './projectItem';
import Spinner from 'react-spinner';

export default class ProjectListView extends React.Component {
    renderProjectItems() {
        return this.props.projects.map((item) => {
            return (
                <ProjectItem key={item.id} project={item} />
            );
        });
    }
    render() {
        return (
            <div>
                <Spinner className={this.props.projects.length === 0 ? '' : 'hidden'} />
                {this.renderProjectItems()}
            </div>
        );
    }
}