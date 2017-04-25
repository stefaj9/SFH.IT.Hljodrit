import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinner';
import SongWithMusiciansAccordion from '../common/songWithMusiciansAccordion';
import moment from 'moment';
import _ from 'lodash';
import { getProjectById, getTracksOnProjectById, publishProjectById } from '../../actions/projectActions';
import { getLabelsByPublisherId, getPublisherIsrcSeriesById, addLabelToOrganizationById } from '../../actions/organizationActions';

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
            if (newProps.project.organizationId !== -1 && !this.state.hasFetchedIsrcSeries) {
                this.props.getPublisherIsrcSeriesById(newProps.project.organizationId);
                this.setState({ hasFetchedIsrcSeries: true });
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
            selectedIsrcSeriesId: -1,
            newLabelName: '',
            hasFetchedLabels: false,
            hasFetchedIsrcSeries: false
        };
    }
    selectLabel(e) {
        this.setState({ selectedLabelId: e.target.value });
        if (this.state.selectedIsrcSeriesId !== -1) {
            let value = e.target.value;
            const { organizationId, reviewComment } = this.state.project;
            this.props.assignConfirmBtnCallback(() => this.props.publishProjectById(this.props.projectId, { labelId: value, isrcSeriesId: this.state.selectedIsrcSeriesId, organizationId: organizationId, reviewComment: reviewComment }));
        }
    }
    selectIsrcSeries(e) {
        this.setState({ selectedIsrcSeriesId: e.target.value });
        if (this.state.selectedLabelId !== -1) {
            let value = e.target.value;
            const { organizationId, reviewComment } = this.state.project;
            this.props.assignConfirmBtnCallback(() => this.props.publishProjectById(this.props.projectId, { labelId: this.state.selectedLabelId, isrcSeriesId: value, organizationId: organizationId, reviewComment: reviewComment }));
        }
    }
    changeReviewComment(e) {
        this.setState({
            project: Object.assign({}, this.state.project, {
                reviewComment: e.target.value
            })
        });
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
    populateLabelOptions() {
        let labelOptions = this.props.organizationLabels.map(label => {
            return <option value={label.labelId} key={label.labelId}>{label.labelName}</option>;
        });
        let labels = <div>
                    <h4>Label</h4>
                    <select className="form-control" onChange={(e) => this.selectLabel(e)} value={this.state.selectedLabelId}>
                        <option value="-1">Ekkert valið</option>
                        {labelOptions}
                    </select>
                    <div className="input-group no-border-radius spacer">
                        <input placeholder={`${this.state.project.organization} [label]`} type="text" value={this.state.newLabelName} onChange={(e) => this.setState({ newLabelName: e.target.value })} className="form-control" />
                        <span onClick={() => this.addLabel()} className={'input-group-addon' + (this.state.newLabelName.length > 0 ? ' background-primary hover-cursor' : '')}>
                            <span className={this.props.isCreatingLabel ? 'visibility-hidden' : ''}><i className="fa fa-fw fa-plus"></i> Bæta við label</span>
                            <Spinner className={this.props.isCreatingLabel ? 'spinner-small' : 'hidden'} />
                        </span>
                    </div>
                 </div>;
        return labels;
    }
    populateIsrcSeriesOptions() {
        let isrcSeriesOptions = '';

        if (this.props.organizationIsrcSeries.length > 0) {
            isrcSeriesOptions = this.props.organizationIsrcSeries.map(isrc => {
                return <option value={isrc.isrcSeriesId} key={isrc.isrcSeriesId}>{`${isrc.isrcOrganizationPart} (${isrc.purposeLabel})`}</option>;
            });
        } else {
            // This organization doesn't own an ISRC-series, therefore should use the default one
            isrcSeriesOptions = [{ isrcSeriesId: 24, isrcOrganizationPart: 'V44', purposeLabel: 'Almenn útgáfa' }, { isrcSeriesId: 26, isrcOrganizationPart: 'Z99', purposeLabel: 'Promo útgáfa' }].map(isrc => {
                return <option value={isrc.isrcSeriesId} key={isrc.isrcSeriesId}>{`${isrc.isrcOrganizationPart} (${isrc.purposeLabel})`}</option>;
            });
        }
        let isrcSeries = <div>
                            <h4>Isrc-sería</h4>
                            <select value={this.state.selectedIsrcSeriesId} onChange={(e) => this.selectIsrcSeries(e)} className="form-control">
                                <option value="-1">Ekkert valið</option>
                                {isrcSeriesOptions}
                            </select>
                         </div>;
        return isrcSeries;
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
                                <textarea value={reviewComment} onChange={(e) => this.changeReviewComment(e)} type="text" className="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
    render() {
        let labels = '';
        let isrcSeries = '';

        if (this.props.action === 'approve') {
            labels = this.populateLabelOptions();
            isrcSeries = this.populateIsrcSeriesOptions();
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
                    {isrcSeries}
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
        organizationLabels: state.organization.selectedOrganizationLabels,
        organizationIsrcSeries: state.organization.selectedOrganizationIsrcSeries
    };
};

export default connect(mapStateToProps, { getProjectById, getTracksOnProjectById, publishProjectById, getLabelsByPublisherId, getPublisherIsrcSeriesById, addLabelToOrganizationById })(ProjectPreviewWindow);