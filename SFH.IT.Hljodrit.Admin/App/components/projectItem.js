import React from 'react';

export default class ProjectItem extends React.Component {
    render() {
        return (
            <div className="project well">
                <div className="project-info">
                    <div className="project-name">
                        <div className="title">Plötuheiti:</div>
                        <div className="value">{this.props.name}</div>
                    </div>
                    <div className="project-author">
                        <div className="title">Höfundur:</div>
                        <div className="value">{this.props.author}</div>
                    </div>
                    <div className="project-submission-user">
                        <div className="title">Notandi:</div>
                        <div className="value">{this.props.submissionUser}</div>
                    </div>
                </div>
                <div className="project-actions"></div>
            </div>
        );
    }
}