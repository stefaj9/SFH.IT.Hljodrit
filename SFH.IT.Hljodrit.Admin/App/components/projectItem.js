import React from 'react';

export default class ProjectItem extends React.Component {
    render() {
        return (
            <div className="project well row">
                <div className="project-info col-md-6 col-xs-12">
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
                <hr className="visible-sm visible-xs project-divider" />
                <div className="project-actions col-md-6 col-xs-12">
                    <div className="project-action"><i className="fa fa-2x fa-check"></i><div>Samþykkja</div></div>
                    <div className="project-action"><i className="fa fa-2x fa-paper-plane"></i><div>Athugasemd</div></div>
                    <div className="project-action"><i className="fa fa-2x fa-pencil"></i><div>Breyta</div></div>
                    <div className="project-action"><i className="fa fa-2x fa-times"></i><div>Eyða</div></div>
                </div>
            </div>
        );
    }
}