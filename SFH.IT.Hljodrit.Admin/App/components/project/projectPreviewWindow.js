import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinner';
import SongWithMusiciansAccordion from '../common/songWithMusiciansAccordion';
import moment from 'moment';
import _ from 'lodash';
import { getProjectById, getTracksOnProjectById } from '../../actions/projectActions';

class ProjectPreviewWindow extends React.Component {
    componentWillMount() {
        this.props.getProjectById(this.props.projectId);
        this.props.getTracksOnProjectById(this.props.projectId);
        moment.locale('is');
    }
    componentWillReceiveProps(newProps) {
        if (_.keys(newProps.project).length > 0) {
            this.setState({ project: newProps.project });
        }
        if (_.keys(newProps.projectTracks).length > 0) {
            this.setState({ projectTracks: newProps.projectTracks });
        }
    }
    constructor() {
        super();
        this.state = {
            project: {
                projectName: '',
                projectStartDate: '',
                projectEndDate: '',
                projectStatusName: '',
                submissionUser: '',
                createdOn : '',
                mainArtist : '',
                reviewBy : '',
                reviewComment : '',
                reviewDate : '',
                organization: ''
            },
            projectTracks: []
        };
    }
    renderFormGroup(label, disabled, value) {
        return (
            <div key={label} className="form-group">
                <label htmlFor="">{label}</label>
                <input disabled={disabled} value={value} type="text" className="form-control"/>
            </div>
        );
    }
    renderForm() {
        const { isEditable } = this.props;
        const { projectName, projectStartDate, projectEndDate, projectStatusName, submissionUser, createdOn, mainArtist, reviewBy, reviewComment, reviewDate, organization } = this.state.project;

        let renderObject = {
            projectName: { display: 'Nafn', value: projectName },
            projectStartDate: { display: 'Byrjunardagsetning', value: moment(projectStartDate).format('LL') },
            projectEndDate: { display: 'Lokadagsetning', value: moment(projectEndDate).year() === 1 ? '-' : moment(projectEndDate).format('LL') },
            projectStatusName: { display: 'Staða verkefnis', value: projectStatusName },
            mainArtist: { display: 'Aðalflytjandi', value: mainArtist },
            organization: { display: 'Útgefandi', value: organization },
            submissionUser: { display: 'Innsent af', value: submissionUser },
            createdOn: { display: 'Dagsetning innsendingar', value: moment(createdOn).format('LL') },
            reviewBy: { display: 'Yfirfarið af', value: reviewBy },
            reviewDate: { display: 'Dagsetning yfirferðar', value: moment(reviewDate).year() === 1 ? '-' : moment(reviewDate).format('LL') }
        };

        let formGroups = Object.keys(renderObject).map((key) => {
            let value = renderObject[key];
            return this.renderFormGroup(value.display, !isEditable, value.value);
        });

        let label

        if (this.props.action === 'approve') {

        }

        return (
            <div>
                <form action="">
                    <div className="row">
                        <div className="col-xs-12">
                            {formGroups}
                            <div className="form-group">
                                <label htmlFor="">Athugasemd við yfirferð</label>
                                <textarea value={reviewComment} type="text" className="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
    render() {
        return (
            <div>
                <Spinner className={this.props.isLoading ? '' : 'hidden'} />
                <div className={this.props.isLoading ? 'hidden' : ''}>
                    {this.renderForm()}
                    <h4>Lög verkefnis</h4>
                    <SongWithMusiciansAccordion
                        songs={this.state.projectTracks}
                        updateState={(newState) => this.setState(newState)}
                        functionDisabled={true} />
                </div>
            </div>
        );
    }
}

ProjectPreviewWindow.propTypes = {
    projectId: PropTypes.number.isRequired,
    isEditable: PropTypes.bool.isRequired,
    action: PropTypes.string
};

function mapStateToProps(state) {
    return {
        isLoading: state.project.isFetchingSingleProject || state.project.isFetchingSingleProjectTracks,
        project: state.project.reviewProject,
        projectTracks: state.project.reviewProjectTracks
    };
};

export default connect(mapStateToProps, { getProjectById, getTracksOnProjectById })(ProjectPreviewWindow);