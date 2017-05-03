import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateField, DatePicker } from 'react-date-picker'

const ProjectDetailsForm = ({ projectTitle, project, inputChangeFunc, selectChangeFunc, startDateChangeFunc, endDateChangeFunc, projectStatusOptions, openModal, readOnly, disabledBtn, saveChanges }) => {
    const { projectName, mainArtist, projectStatus, organization, projectStartDate, projectEndDate, projectType, isWorkingTitle } = project;
    
    moment.locale('is');

    function renderStatusOptions() {
        return projectStatusOptions.map(option => {
            return <option value={option.code} key={option.code}>{option.name}</option>;
        });
    }

    function renderProjectTypeOptions() {
        let options = [{ id: 1, value: 'Venjuleg plata' }, { id: 2, value: 'Safnplata' }, { id: 3, value: 'Single' }];
        return options.map((option) => {
            return (
                <option key={option.id} value={option.id}>{option.value}</option>
            );
        });
    }

    function renderDateField(dateField, label, onChangeFunc) {
        if (dateField) {
            return (
                <div className="form-group">
                    <label htmlFor="">{label}</label>
                    <DateField
                        disabled={readOnly}
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

    return (
        <div>
            <h2>{projectTitle}</h2>
            <p className={readOnly ? '' : 'hidden'}>Eingöngu er hægt að breyta verkefnum sem hefur ekki verið gefið út.</p>
            <form action="">
                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="">Nafn</label>
                            <input readOnly={readOnly} value={projectName} onChange={(e) => inputChangeFunc(e, 'projectName')} type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="">Aðalflytjandi</label>
                            <div className="input-group">
                                <input value={mainArtist} readOnly={true} type="text" className="form-control"/>
                                <span className={'input-group-addon' + (readOnly ? '' : ' hover-cursor-primary hover-cursor')} onClick={() => { if (readOnly) { return; } openModal('isMainArtistModalOpen') } }>Breyta</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="">Staða verkefnis</label>
                            <select disabled={readOnly} value={projectStatus} onChange={(e) => selectChangeFunc(e, 'projectStatus', 'projectStatusName')} name="project-status" id="project-status" className="form-control">
                                {renderStatusOptions()}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="">Útgefandi</label>
                            <div className="input-group">
                                <input type="text" value={organization} readOnly={true} className="form-control"/>
                                <span className={'input-group-addon' + (readOnly ? '' : ' hover-cursor-primary hover-cursor')} onClick={() => { if (readOnly) { return; } openModal('isOrganizationModalOpen') }}>Breyta</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                        {renderDateField(projectStartDate, 'Upphafsdagsetning verkefnis', startDateChangeFunc)}
                    </div>
                    <div className="col-sm-6 col-xs-12">
                        {renderDateField(projectEndDate, 'Lokadagsetning verkefnis', endDateChangeFunc)}
                    </div>
                    <div className="col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="">Tegund verkefnis</label>
                            <select disabled={readOnly} value={projectType} onChange={(e) => selectChangeFunc(e, 'projectType', 'projectTypeName')} name="project-type" id="project-type" className="form-control">
                                {renderProjectTypeOptions()}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                        <div className="checkbox">
                            <label htmlFor="project-is-working-title">
                                <input disabled={readOnly} type="checkbox" checked={!isWorkingTitle} id="project-is-working-title" name="project-is-working-title" onChange={(e) => inputChangeFunc(e, 'isWorkingTitle')} /> Skráð heiti er endanlegt útgáfuheiti
                            </label>
                        </div>
                    </div>
                    <div className="col-xs-12 text-right">
                        <button disabled={readOnly || disabledBtn} onClick={(e) => saveChanges(e)} className="btn btn-default btn-primary">Vista</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

ProjectDetailsForm.propTypes = {
    projectTitle: PropTypes.string,
    project: PropTypes.object.isRequired,
    inputChangeFunc: PropTypes.func.isRequired,
    selectChangeFunc: PropTypes.func.isRequired,
    startDateChangeFunc: PropTypes.func.isRequired,
    endDateChangeFunc: PropTypes.func.isRequired,
    projectStatusOptions: PropTypes.array.isRequired,
    openModal: PropTypes.func,
    readOnly: PropTypes.bool,
    saveChanges: PropTypes.func.isRequired,
    disabledBtn: PropTypes.bool
};

export default ProjectDetailsForm;