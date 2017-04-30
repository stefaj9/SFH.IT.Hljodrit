import React from 'react';
import { connect } from 'react-redux';
import { getProjectById } from '../../actions/projectActions';
import { getMainArtistsByCriteria } from '../../actions/mainArtistActions';
import { getPublishersByCriteria } from '../../actions/organizationActions';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import ProjectDetailsForm from './projectDetailsForm';
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
            isOrganizationModalOpen: false
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
            })
        })
    }
    changeOrganization(organization) {
        this.setState({
            project: Object.assign({}, this.state.project, {
                organization: organization.name,
                organizationId: organization.id
            })
        })
    }
    updateStartDate(dateString, momentObj) {
        this.setState({
            project: Object.assign({}, this.state.project, {
                projectStartDate: moment(momentObj.timestamp).format('YYYY-MM-DDTHH:mm:ss')
            })
        });
    }
    updateEndDate(dateString, momentObj) {
        this.setState({
            project: Object.assign({}, this.state.project, {
                projectEndDate: moment(momentObj.timestamp).format('YYYY-MM-DDTHH:mm:ss')
            })
        });
    }
    onProjectSelectChange(e, key, val) {
        let project = _.cloneDeep(this.state.project);
        let index = e.target.selectedIndex;
        project[key] = e.target.value;
        project[val] = e.target.options[index].text;
        this.setState({ project: project });
    }
    onProjectPropsChange(e, prop) {
        let project = _.cloneDeep(this.state.project);
        let target = e.target;
        let value = target.type === 'checkbox' ? !target.checked : target.value;
        project[prop] = value;
        this.setState({ project: project });
    }
    render() {
        const { project, isMainArtistModalOpen, isOrganizationModalOpen } = this.state;
        return (
            <div>
                <Spinner className={this.props.isFetchingProjectById ? '' : 'hidden'} />
                <div className={this.props.isFetchingProjectById ? 'hidden' : ''}>
                    <ProjectDetailsForm
                        project={project}
                        inputChangeFunc={(e, prop) => this.onProjectPropsChange(e, prop)}
                        selectChangeFunc={(e, key, val) => this.onProjectSelectChange(e, key, val)}
                        startDateChangeFunc={this.updateStartDate.bind(this)}
                        endDateChangeFunc={this.updateEndDate.bind(this)}
                        projectStatusOptions={this.props.projectStatusOptions}
                        openModal={(prop) => this.openModal(prop)} />
                </div>
                <SelectPersonModal
                    isOpen={isMainArtistModalOpen}
                    close={() => this.setState({ isMainArtistModalOpen: false })}
                    registerPath="/api/mainartists"
                    envelope={this.props.mainArtistEnvelope}
                    fetch={this.props.getMainArtistsByCriteria}
                    beginFetch={this.props.isFetchingList}
                    stoppedFetch={this.props.hasStoppedFetchingList}
                    next={() => this.setState({ isMainArtistModalOpen: false })}
                    update={(artist) => this.changeMainArtist(artist)}
                    steps={() => { return ( <h4>Breyta aðalflytjanda</h4> ) } } />
                <SelectPersonModal
                    isOpen={isOrganizationModalOpen}
                    close={() => this.setState({ isOrganizationModalOpen: false })}
                    envelope={this.props.organizationEnvelope}
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
        isFetchingProjectById: state.project.isFetchingProjectById,
        projectStatusOptions: state.project.statusOptions,
        mainArtistEnvelope: state.mainArtist.mainArtistEnvelope,
        organizationEnvelope: state.organization.organizationEnvelope
    };
};

export default connect(mapStateToProps, { getProjectById, getMainArtistsByCriteria, getPublishersByCriteria, isFetchingList, hasStoppedFetchingList })(ProjectDetails);