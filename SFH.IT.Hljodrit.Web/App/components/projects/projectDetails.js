import React from 'react';
import { connect } from 'react-redux';
import { getProjectById } from '../../actions/projectActions';
import Spinner from 'react-spinner';
import { DateField, DatePicker } from 'react-date-picker'
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
            hasReceived: false
        };
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
    renderStatusOptions() {
        return this.props.projectStatusOptions.map(option => {
            return <option value={option.code} key={option.code}>{option.name}</option>;
        });
    }
    renderProjectTypeOptions() {
        let options = [{ id: 1, value: 'Venjuleg plata' }, { id: 2, value: 'Safnplata' }, { id: 3, value: 'Single' }];
        return options.map((option) => {
            return (
                <option key={option.id} value={option.id}>{option.value}</option>
            );
        });
    }
    renderDateField(dateField, label, onChangeFunc) {
        if (dateField) {
            return (
                <div className="form-group">
                    <label htmlFor="">{label}</label>
                    <DateField
                        dateFormat={'DD.MM.YYYY'}
                        updateOnDateClick={true}
                        defaultValue={moment(dateField).format('DD.MM.YYYY')}>
                        <DatePicker
                            navigation={true}
                            locale='is'
                            forceValidDate={true}
                            highlightWeekends={true}
                            highlightToday={true}
                            weekNumbers={true}
                            weekStartDay={1}
                            onChange={onChangeFunc} />
                    </DateField>
                </div>
            );
        }
    }
    render() {
        const { selectedProject } = this.props;
        const { projectName, mainArtist, projectStatus, organization, projectStartDate, projectEndDate, projectType, isWorkingTitle } = this.state.project;
        return (
            <div>
                <Spinner className={this.props.isFetchingProjectById ? '' : 'hidden'} />
                <div className={this.props.isFetchingProjectById ? 'hidden' : ''}>
                    <h2>{selectedProject.projectName}</h2>
                    <form action="">
                        <div className="row">
                            <div className="col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="">Nafn</label>
                                    <input value={projectName} onChange={(e) => this.onProjectPropsChange(e, 'projectName')} type="text" className="form-control"/>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="">Aðalflytjandi</label>
                                    <div className="input-group">
                                        <input value={mainArtist} readOnly={true} type="text" className="form-control"/>
                                        <span className="input-group-addon hover-cursor hover-cursor-primary">Breyta</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="">Staða verkefnis</label>
                                    <select value={projectStatus} onChange={(e) => this.onProjectSelectChange(e, 'projectStatus', 'projectStatusName')} name="project-status" id="project-status" className="form-control">
                                        {this.renderStatusOptions()}
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="">Útgefandi</label>
                                    <div className="input-group">
                                        <input type="text" value={organization} readOnly={true} className="form-control"/>
                                        <span className="input-group-addon hover-cursor hover-cursor-primary">Breyta</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                {this.renderDateField(projectStartDate, 'Upphafsdagsetning verkefnis', this.updateStartDate.bind(this))}
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                {this.renderDateField(projectEndDate, 'Lokadagsetning verkefnis', this.updateEndDate.bind(this))}
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label htmlFor="">Tegund verkefnis</label>
                                    <select value={projectType} onChange={(e) => this.onProjectSelectChange(e, 'projectType', 'projectTypeName')} name="project-type" id="project-type" className="form-control">
                                        {this.renderProjectTypeOptions()}
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="checkbox">
                                    <label htmlFor="project-is-working-title">
                                        <input type="checkbox" checked={!isWorkingTitle} id="project-is-working-title" name="project-is-working-title" onChange={(e) => this.onProjectPropsChange(e, 'isWorkingTitle')} /> Skráð heiti er endanlegt útgáfuheiti
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-12 text-right">
                                <button className="btn btn-default btn-primary">Vista</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        selectedProject: state.project.selectedProject,
        isFetchingProjectById: state.project.isFetchingProjectById,
        projectStatusOptions: state.project.statusOptions
    };
};

export default connect(mapStateToProps, { getProjectById })(ProjectDetails);