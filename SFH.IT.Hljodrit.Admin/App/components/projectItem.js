import React from 'react';

export default class ProjectItem extends React.Component {
    render() {
        return (
            <div className="project">
                <div className="project-info">
                    <div className="project-name">{this.props.name}</div>
                    <div className="project-author">{this.props.author}</div>
                    <div className="project-submission-user">{this.props.submissionUser}</div>
                </div>
                <div className="project-actions"></div>
            </div>
        );
    }
}