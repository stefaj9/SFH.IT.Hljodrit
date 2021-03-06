import React from 'react';
import { connect } from 'react-redux';
import Steps from '../../common/steps';
import { getMainArtistsByCriteria } from '../../../actions/mainArtistActions';
import { isFetchingList, hasStoppedFetchingList } from '../../../actions/flowActions';
import { toastr } from 'react-redux-toastr';
import SelectPersonModal from '../selectPersonModal';

class ProjectBasicInfo extends React.Component {
    constructor() {
        super();

        this.state = {
            projectName: '',
            projectType: {
                id: 1,
                value: 'Venjuleg plata'
            },
            projectYearOfPublish: '',
            projectStatus: {
                code: 'ACTIVE',
                name: 'Í vinnslu'
            },
            projectMainArtist: {
                id: -1,
                name: ''
            },
            isWorkingTitle: false,
            mainArtistModalIsOpen: false
        };
    }
    populateOptions() {
        let options = [{ id: 1, value: 'Venjuleg plata' }, { id: 2, value: 'Safnplata' }, { id: 3, value: 'Single' }];
        return options.map((option) => {
            return (
                <option key={option.id} value={option.id}>{option.value}</option>
            );
        });
    }
    populateStatusOptions() {
        return this.props.statusOptions.map(status => {
            return (
                <option key={status.code} value={status.code}>{status.name}</option>
            );
        });
    }
    updateStatus(e) {
        let index = e.target.selectedIndex;
        this.setState({
            projectStatus: {
                code: e.target.value,
                name: e.target.options[index].text
            }
        });
    }
    isValid() {
        const { projectType, projectName, projectMainArtist, projectYearOfPublish } = this.state;
        return projectType.id === 1 ? projectName.length > 0 && projectMainArtist.id !== -1 && projectYearOfPublish !== '' : projectName.length > 0 && projectYearOfPublish !== '';
    }
    submitBasicInfo(e) {
        e.preventDefault();
        this.props.next(this.state);
    }
    addMainArtist(artist) {
        this.setState({
            projectMainArtist: artist
        });
        toastr.success('Tókst!', 'Það tókst að bæta við aðalflytjanda');
    }
    removeMainArtist(e) {
        e.preventDefault();
        this.setState({
            projectMainArtist: {
                id: -1,
                name: ''
            }
        });
        toastr.success('Tókst!', 'Það tókst að fjarlægja aðalflytjanda');
    }
    selectProjectType(e) {
        let index = e.target.selectedIndex;
        this.setState({
            projectType: {
                id: parseInt(e.target.value),
                value: e.target.options[index].text
            }
        });
    }
    render() {
        const { projectType, projectName, projectMainArtist, mainArtistModalIsOpen, projectYearOfPublish, projectStatus } = this.state;
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <Steps steps={this.props.steps} currentStep={1} />
                <h4>Grunnupplýsingar</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="project-name">Plötuheiti:</label>
                        <input 
                            autoFocus={true}
                            type="text" 
                            value={projectName} 
                            onChange={(e) => this.setState({ projectName: e.target.value })} 
                            id="project-name" 
                            name="project-name" 
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="project-is-working-title">Skráð heiti er endanlegt útgáfuheiti:</label>
                        <div className="radio">
                            <label>
                                <input checked={this.state.isWorkingTitle === false} onChange={(e) => this.setState({ isWorkingTitle: JSON.parse(e.target.value) })} type="radio" name="project-is-working-title" value={false} />
                                Já
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input checked={this.state.isWorkingTitle === true} onChange={(e) => this.setState({ isWorkingTitle: JSON.parse(e.target.value) })} type="radio" name="project-is-working-title" value={true} />
                                Nei
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="project-type">Tegund plötu:</label>
                        <select 
                            className="form-control" 
                            name="project-type" 
                            id="project-type" 
                            value={projectType.id} 
                            onChange={(e) => this.selectProjectType(e) }>
                                {this.populateOptions()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="project-publish-year">Útgáfuár:</label>
                        <input 
                            type="number"
                            className="form-control"
                            name="project-publish-year"
                            id="project-publish-year"
                            value={projectYearOfPublish}
                            onChange={(e) =>  this.setState({ projectYearOfPublish: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="project-publish-status">Staða verkefnis:</label>
                        <select 
                            name="project-publish-status" 
                            id="project-publish-status" 
                            className="form-control"
                            value={projectStatus.code}
                            onChange={(e) => this.updateStatus(e)}>
                            {this.populateStatusOptions()}
                        </select>
                    </div>
                    <div className={projectType.id === 1 ? 'form-group' : 'hidden'}>
                        <div className={projectMainArtist.id === -1 ? 'hidden' : ''}>
                            <table className="table table-default table-striped table-responsive">
                                <thead>
                                    <tr>
                                        <th>Nafn</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{projectMainArtist.name}</td>
                                        <td><a href="#" onClick={(e) => this.removeMainArtist(e) }><i className="fa fa-times"></i></a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className={projectMainArtist.id !== -1 ? 'hidden' : ''}>Gerð er krafa um að það sé skráður aðalflytjandi á plötuna.</p>
                        <div className="form-group">
                            <button 
                                className="btn btn-default"
                                disabled={projectMainArtist.id !== -1}
                                onClick={(e) => { e.preventDefault(); this.setState({ mainArtistModalIsOpen: true }) } }> <i className="fa fa-fw fa-plus"></i> Bæta við aðalflytjanda</button>
                        </div>
                    </div>
                    <div className="form-group pull-right">
                        <button 
                            className="btn btn-default btn-primary" 
                            onClick={(e) => { window.scrollTo(0, 0); this.submitBasicInfo(e); }}
                            disabled={!this.isValid()} >
                            Áfram
                        </button>
                    </div>
                </form>
                <SelectPersonModal
                    isOpen={mainArtistModalIsOpen}
                    close={() => this.setState({ mainArtistModalIsOpen: false })}
                    registerPath="/api/mainartists"
                    envelope={this.props.mainArtistEnvelope}
                    fetch={this.props.getMainArtistsByCriteria}
                    beginFetch={this.props.isFetchingList}
                    stoppedFetch={this.props.hasStoppedFetchingList}
                    next={() => this.setState({ mainArtistModalIsOpen: false })}
                    update={(artist) => this.addMainArtist(artist)}
                    steps={() => { return ( <h4>Bæta við aðalflytjanda</h4> ) } } />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        mainArtistEnvelope: state.mainArtist.mainArtistEnvelope,
        statusOptions: state.project.statusOptions,
        countries: state.common.countries
    };
};

export default connect(mapStateToProps, { getMainArtistsByCriteria, isFetchingList, hasStoppedFetchingList })(ProjectBasicInfo);