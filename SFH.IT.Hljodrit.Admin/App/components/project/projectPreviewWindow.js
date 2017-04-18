import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinner';
import _ from 'lodash';
import { getProjectById } from '../../actions/projectActions';

class ProjectPreviewWindow extends React.Component {
    componentWillMount() {
        this.props.getProjectById(this.props.projectId);
    }
    componentWillReceiveProps(newProps) {
        if (_.keys(newProps.project).length > 0) {
            this.setState({ project: newProps.project });
        }
    }
    constructor() {
        super();
        this.state = {
            project: {}
        };
    }
    renderForm() {
        if (!this.props.isLoading) {
            const { isEditable } = this.props;
            const { projectName, projectStartDate, projectEndDate, projectStatus, submissionUser, createdOn, mainArtist, reviewBy, reviewComment, reviewDate } = this.state.project;
            return (
                <div>
                    <form action="">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="">Nafn</label>
                                    <input disabled={ !isEditable } value={projectName} type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Byrjunardagsetning</label>
                                    <input disabled={ !isEditable } value={projectStartDate} type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Lokadagsetning</label>
                                    <input disabled={ !isEditable } value={projectEndDate} type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Aðalflytjandi</label>
                                    <input disabled={ !isEditable } value={mainArtist} type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Staða verkefnis</label>
                                    <input disabled={true} value={projectStatus} type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Innsent af</label>
                                    <input disabled={true} value={submissionUser} type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Dagsetning innsendingar</label>
                                    <input disabled={true} value={createdOn} type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Yfirfarið af</label>
                                    <input disabled={true} value={reviewBy} type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Dagsetning yfirferðar</label>
                                    <input disabled={true} value={reviewDate} type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Athugasemd við yfirferð</label>
                                    <input disabled={ !isEditable } value={reviewComment} type="text" className="form-control"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                <Spinner className={this.props.isLoading ? '' : 'hidden'} />
                {this.renderForm()}
            </div>
        );
    }
}

ProjectPreviewWindow.propTypes = {
    projectId: PropTypes.number.isRequired,
    isEditable: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.project.isFetchingSingleProject,
        project: state.project.reviewProject
    };
};

export default connect(mapStateToProps, { getProjectById })(ProjectPreviewWindow);