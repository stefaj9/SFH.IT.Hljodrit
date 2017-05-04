import React from 'react';
import { connect } from 'react-redux';
import { getProjectById, getProjectTracksById, updateProjectById, removeTracksFromProject, addTrackToProject } from '../../actions/projectActions';
import { getMainArtistsByCriteria } from '../../actions/mainArtistActions';
import { getPublishersByCriteria } from '../../actions/organizationActions';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import ProjectDetailsForm from './projectDetailsForm';
import ProjectDetailsTrackTable from './projectDetailsTrackTable';
import SelectPersonModal from './selectPersonModal';
import Spinner from 'react-spinner';
import _ from 'lodash';
import moment from 'moment';

class ProjectDetails extends React.Component {
    componentWillReceiveProps(newProps) {
        if (_.keys(newProps.selectedProject).length > 0 && !this.state.hasReceived) {
            this.setState({
                project: newProps.selectedProject,
                hasReceived: true
            });
        }
    }
    componentWillMount() {
        this.props.getProjectById(this.props.routeParams.projectId);
        this.props.getProjectTracksById(this.props.routeParams.projectId);
        moment.locale('is');
    }
    constructor() {
        super();
        this.state = {
            project: {
                projectName: '',
                mainArtistId: -1,
                mainArtist: '',
                projectStatus: '',
                projectStatusName: '',
                organization: '',
                organizationId: -1,
                projectStartDate: '',
                projectEndDate: '',
                projectType: 1,
                projectTypeName: 'Venjuleg plata',
                isWorkingTitle: false
            },
            hasReceived: false,
            isMainArtistModalOpen: false,
            isOrganizationModalOpen: false,

            formDirty: false
        };
    }
    openModal(prop) {
        this.setState({
            [prop]: true
        });
    }
    changeMainArtist(mainArtist) {
        this.setState({
            project: Object.assign({}, this.state.project, {
                mainArtist: mainArtist.name,
                mainArtistId: mainArtist.id
            }),
            formDirty: true
        })
    }
    changeOrganization(organization) {
        this.setState({
            project: Object.assign({}, this.state.project, {
                organization: organization.name,
                organizationId: organization.id
            }),
            formDirty: true
        })
    }
    updateStartDate(dateString, momentObj) {
        this.setState({
            project: Object.assign({}, this.state.project, {
                projectStartDate: moment(momentObj.timestamp).format('YYYY-MM-DDTHH:mm:ss')
            }),
            formDirty: true
        });
    }
    updateEndDate(dateString, momentObj) {
        this.setState({
            project: Object.assign({}, this.state.project, {
                projectEndDate: moment(momentObj.timestamp).format('YYYY-MM-DDTHH:mm:ss')
            }),
            formDirty: true
        });
    }
    onProjectSelectChange(e, key, val) {
        let project = _.cloneDeep(this.state.project);
        let index = e.target.selectedIndex;
        project[key] = e.target.value;
        project[val] = e.target.options[index].text;
        this.setState({ project: project, formDirty: true });
    }
    onProjectPropsChange(e, prop) {
        let project = _.cloneDeep(this.state.project);
        let target = e.target;
        let value = target.type === 'checkbox' ? !target.checked : target.value;
        project[prop] = value;
        this.setState({ project: project, formDirty: true });
    }
    updateProjectInfo(e) {
        e.preventDefault();
        this.props.updateProjectById(this.props.routeParams.projectId, this.state.project);
        // Set hasReceived to false, so that the component will update itself when it receives the latest project.
        this.setState({ hasReceived: false });
    }
    render() {
        const { project, isMainArtistModalOpen, isOrganizationModalOpen, formDirty } = this.state;
        const { selectedProject, selectedProjectTracks, mainArtistEnvelope, organizationEnvelope, projectStatusOptions } = this.props;
        return (
            <div>
                <Spinner className={this.props.isFetchingProjectById ? '' : 'hidden'} />
                <div className={this.props.isFetchingProjectById ? 'hidden' : ''}>
                    <ProjectDetailsForm
                        readOnly={selectedProject.projectStatus === 'PUBLISHED'}
                        projectTitle={selectedProject.projectName}
                        project={project}
                        inputChangeFunc={(e, prop) => this.onProjectPropsChange(e, prop)}
                        selectChangeFunc={(e, key, val) => this.onProjectSelectChange(e, key, val)}
                        startDateChangeFunc={this.updateStartDate.bind(this)}
                        endDateChangeFunc={this.updateEndDate.bind(this)}
                        projectStatusOptions={projectStatusOptions}
                        openModal={(prop) => this.openModal(prop)}
                        saveChanges={(e) => this.updateProjectInfo(e)}
                        disabledBtn={!formDirty} />
                    <h3>Lög</h3>
                    <ProjectDetailsTrackTable
                        isReadOnly={selectedProject.projectStatus === 'PUBLISHED'}
                        projectId={this.props.routeParams.projectId}
                        tracks={selectedProjectTracks}
                        removeTracksFromProject={(ids) => this.props.removeTracksFromProject(this.props.routeParams.projectId, ids)}
                        addTrackToProject={(track) => this.props.addTrackToProject(this.props.routeParams.projectId, track)}
                        isLoading={this.props.isFetchingProjectById} />
                </div>
                <SelectPersonModal
                    isOpen={isMainArtistModalOpen}
                    close={() => this.setState({ isMainArtistModalOpen: false })}
                    registerPath="/api/mainartists"
                    envelope={mainArtistEnvelope}
                    fetch={this.props.getMainArtistsByCriteria}
                    beginFetch={this.props.isFetchingList}
                    stoppedFetch={this.props.hasStoppedFetchingList}
                    next={() => this.setState({ isMainArtistModalOpen: false })}
                    update={(artist) => this.changeMainArtist(artist)}
                    steps={() => { return ( <h4>Breyta aðalflytjanda</h4> ) } } />
                <SelectPersonModal
                    isOpen={isOrganizationModalOpen}
                    close={() => this.setState({ isOrganizationModalOpen: false })}
                    envelope={organizationEnvelope}
                    fetch={this.props.getPublishersByCriteria}
                    beginFetch={this.props.isFetchingList}
                    stoppedFetch={this.props.hasStoppedFetchingList}
                    next={() => this.setState({ isOrganizationModalOpen: false })}
                    update={(organization) => this.changeOrganization(organization)}
                    steps={() => { return <h4>Breyta útgefanda</h4>; }} />
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        selectedProject: state.project.selectedProject,
        selectedProjectTracks: state.project.selectedProjectTracks,
        isFetchingProjectById: state.project.isFetchingProjectById,
        projectStatusOptions: state.project.statusOptions,
        mainArtistEnvelope: state.mainArtist.mainArtistEnvelope,
        organizationEnvelope: state.organization.organizationEnvelope
    };
};

export default connect(mapStateToProps, { getProjectById, getProjectTracksById, updateProjectById, removeTracksFromProject, addTrackToProject, getMainArtistsByCriteria, getPublishersByCriteria, isFetchingList, hasStoppedFetchingList })(ProjectDetails);