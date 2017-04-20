import React, { PropTypes } from 'react';
import moment from 'moment';

const ProjectItem = ({ project, approveProjectCallback, commentProjectCallback, changeProjectCallback, removeProjectCallback }) => {
    moment.locale('is');
    return (
        <div className={`list well row project-item-${project.projectStatus.toLowerCase()}`}>
            <div className="list-info col-md-6 col-xs-12">
                <div className="list-item">
                    <div className="title">Plötuheiti:</div>
                    <div className="value">{project.projectName}</div>
                </div>
                <div className="list-item">
                    <div className="title">Aðalflytjandi:</div>
                    <div className="value">{project.mainArtist}</div>
                </div>
                <div className="list-item">
                    <div className="title">Notandi:</div>
                    <div className="value">{project.submissionUser}</div>
                </div>
                <div className="list-item">
                    <div className="title">Síðast breytt:</div>
                    <div className="value">{moment(project.lastModificationDate).format('lll')}</div>
                </div>
            </div>
            <hr className="visible-sm visible-xs list-divider" />
            <div className="list-actions col-md-6 col-xs-12">
                <div
                    className={'list-action' + (project.projectStatus === 'CLOSED' ? '' : ' hidden')}
                    onClick={() => approveProjectCallback(project.id)}>
                    <i className="fa fa-2x fa-check"></i>
                    <div>Samþykkja</div>
                </div>
                <div
                    className={'list-action' + (project.projectStatus === 'PUBLISHED' ? ' hidden' : '')}
                    onClick={() => commentProjectCallback(project.id)}>
                    <i className="fa fa-2x fa-paper-plane"></i>
                    <div>Athugasemd</div>
                </div>
                <div
                    className={'list-action' + (project.projectStatus === 'PUBLISHED' ? ' hidden' : '')}
                    onClick={() => changeProjectCallback(project.id)}>
                    <i className="fa fa-2x fa-pencil"></i>
                    <div>Breyta</div>
                </div>
                <div
                    className={'list-action' + (project.projectStatus === 'PUBLISHED' ? ' hidden' : '')}
                    onClick={() => removeProjectCallback(project.id)}>
                    <i className="fa fa-2x fa-times"></i>
                    <div>Eyða</div>
                </div>
            </div>
        </div>
    );
};

ProjectItem.propTypes = {
    project: PropTypes.object.isRequired,
    approveProjectCallback: PropTypes.func.isRequired,
    commentProjectCallback: PropTypes.func.isRequired,
    changeProjectCallback: PropTypes.func.isRequired,
    removeProjectCallback: PropTypes.func.isRequired
};

export default ProjectItem;
