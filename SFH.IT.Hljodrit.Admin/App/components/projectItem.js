import React from 'react';
import { connect } from 'react-redux';
import { selectProjectWithActionById } from '../actions/projectActions';
import moment from 'moment';

class ProjectItem extends React.Component {
    componentWillMount() {
        moment.locale('is');
    }
    handleActionClick(actionType, id) {
        this.props.selectProjectWithActionById(id, actionType);
    }
    render() {
        return (
            <div className="list well row">
                <div className="list-info col-md-6 col-xs-12">
                    <div className="list-item">
                        <div className="title">Plötuheiti:</div>
                        <div className="value">{this.props.project.projectName}</div>
                    </div>
                    <div className="list-item">
                        <div className="title">Aðalflytjandi:</div>
                        <div className="value">{this.props.project.mainArtist}</div>
                    </div>
                    <div className="list-item">
                        <div className="title">Notandi:</div>
                        <div className="value">{this.props.project.submissionUser}</div>
                    </div>
                    <div className="list-item">
                        <div className="title">Síðast breytt:</div>
                        <div className="value">{moment(this.props.project.lastModificationDate).format('lll')}</div>
                    </div>
                </div>
                <hr className="visible-sm visible-xs list-divider" />
                <div className="list-actions col-md-6 col-xs-12">
                    <div
                        className="list-action"
                        onClick={() => this.handleActionClick('approve', this.props.project.id)}>
                        <i className="fa fa-2x fa-check"></i>
                        <div>Samþykkja</div>
                    </div>
                    <div
                        className="list-action"
                        onClick={() => this.handleActionClick('comment', this.props.project.id)}>
                        <i className="fa fa-2x fa-paper-plane"></i>
                        <div>Athugasemd</div>
                    </div>
                    <div
                        className="list-action"
                        onClick={() => this.handleActionClick('modify', this.props.project.id)}>
                        <i className="fa fa-2x fa-pencil"></i>
                        <div>Breyta</div>
                    </div>
                    <div
                        className="list-action"
                        onClick={() => this.handleActionClick('delete', this.props.project.id)}>
                        <i className="fa fa-2x fa-times"></i>
                        <div>Eyða</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { selectProjectWithActionById })(ProjectItem);
