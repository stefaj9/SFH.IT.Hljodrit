import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinner';
import SongWithMusiciansAccordion from '../common/songWithMusiciansAccordion';
import moment from 'moment';
import _ from 'lodash';
import { getProjectById, getTracksOnProjectById, publishProjectById } from '../../actions/projectActions';
import { getLabelsByPublisherId, addLabelToOrganizationById } from '../../actions/organizationActions';

class ProjectPreviewWindow extends React.Component {
    componentWillMount() {
        this.props.getProjectById(this.props.projectId);
        this.props.getTracksOnProjectById(this.props.projectId);
        moment.locale('is');
    }
    componentWillReceiveProps(newProps) {
        if (_.keys(newProps.project).length > 0) {
            this.setState({ project: newProps.project });
            if (newProps.project.organizationId !== -1 && !this.state.hasFetchedLabels) {
                this.props.getLabelsByPublisherId(newProps.project.organizationId);
                this.setState({ hasFetchedLabels: true });
            }
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
                organization: '',
                organizationId: -1
            },
            projectTracks: [],
            selectedLabelId: -1,
            newLabelName: '',
            hasFetchedLabels: false
        };
    }
    selectLabel(e) {
        this.setState({ selectedLabelId: e.target.value });
        let value = e.target.value;
        const { organizationId, reviewComment } = this.state.project;
        this.props.assignConfirmBtnCallback(() => this.props.publishProjectById(this.props.projectId, { labelId: value, isrcSeriesId: 24, organizationId: organizationId, reviewComment: reviewComment }));
    }
    addLabel() {
        let labelName = this.state.newLabelName;
        if (labelName.length === 0) {
            return;
        }
        let organizationId = this.state.project.organizationId;
        this.props.addLabelToOrganizationById(organizationId, { 
            organizationId: organizationId,
            labelName: labelName
        });
        this.setState({ newLabelName: '' });
    }
    renderFormGroup(label, disabled, value) {
        return (
            <div key={label} className="form-group">
                <label htmlFor="">{label}</label>
                <input readOnly={disabled} value={value} type="text" className="form-control"/>
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
        let labels = '';

        if (this.props.action === 'approve') {
            let options = this.props.organizationLabels.map(label => {
                return <option value={label.labelId} key={label.labelId}>{label.labelName}</option>;
            });
            labels = <div>
                        <h4>Label</h4>
                        <select className="form-control" onChange={(e) => this.selectLabel(e)} value={this.state.selectedLabelId}>
                            <option value="-1">Ekkert valið</option>
                            {options}
                        </select>
                        <div className="input-group no-border-radius spacer">
                            <input placeholder={`${this.state.project.organization} [label]`} type="text" value={this.state.newLabelName} onChange={(e) => this.setState({ newLabelName: e.target.value })} className="form-control" />
                            <span onClick={() => this.addLabel()} className={'input-group-addon' + (this.state.newLabelName.length > 0 ? ' background-primary hover-cursor' : '')}>
                                <span className={this.props.isCreatingLabel ? 'visibility-hidden' : ''}><i className="fa fa-fw fa-plus"></i> Bæta við label</span>
                                <Spinner className={this.props.isCreatingLabel ? 'spinner-small' : 'hidden'} />
                            </span>
                        </div>
                     </div>;
        }
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
                    {labels}
                </div>
            </div>
        );
    }
}

ProjectPreviewWindow.propTypes = {
    projectId: PropTypes.number.isRequired,
    isEditable: PropTypes.bool.isRequired,
    action: PropTypes.string,
    assignConfirmBtnCallback: PropTypes.func
};

function mapStateToProps(state) {
    return {
        isLoading: state.project.isFetchingSingleProject || state.project.isFetchingSingleProjectTracks,
        isCreatingLabel: state.organization.isCreatingLabel,
        project: state.project.reviewProject,
        projectTracks: state.project.reviewProjectTracks,
        organizationLabels: state.organization.selectedOrganizationLabels
    };
};

export default connect(mapStateToProps, { getProjectById, getTracksOnProjectById, publishProjectById, getLabelsByPublisherId, addLabelToOrganizationById })(ProjectPreviewWindow);