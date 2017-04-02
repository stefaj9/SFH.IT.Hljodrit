import React from 'react';
import { connect } from 'react-redux';
import ModalSteps from '../common/modalSteps';
import { getMainArtistsByCriteria } from '../../actions/mainArtistActions';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import { toastr } from 'react-redux-toastr';
import SelectPersonModal from './selectPersonModal';

class ProjectBasicInfo extends React.Component {
    constructor() {
        super();

        this.state = {
            projectName: '',
            projectType: 1,
            projectYearOfPublish: '',
            projectCountryOfPublish: {
                code: 'IS',
                name: 'Ísland'
            },
            projectMainArtist: {
                id: -1,
                name: ''
            },
            mainArtistModalIsOpen: false
        };
    }
    populateOptions() {
        let options = ['Venjuleg plata', 'Safnplata', 'Single'];
        return options.map((option, idx) => {
            return (
                <option key={`${option}-${idx + 1}`} value={idx + 1}>{option}</option>
            );
        });
    }
    populateCountryOptions() {
        return this.props.countries.map((country) => {
            return (
                <option key={country.numericIsoCode} value={country.twoLetterCode}>{country.name}</option>
            );
        });
    }
    updateCountry(e) {
        let code = e.target.value;
        let name = e.target.options[e.target.selectedIndex].text;

        this.setState({
            projectCountryOfPublish: {
                code: code,
                name: name
            }
        });
    }
    isValid() {
        const { projectType, projectName, projectMainArtist, projectYearOfPublish } = this.state;
        return projectType === 1 ? projectName.length > 0 && projectMainArtist.id !== -1 && projectYearOfPublish !== '' : projectName.length > 0;
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
    render() {
        const { projectType, projectName, projectMainArtist, mainArtistModalIsOpen, projectYearOfPublish, projectCountryOfPublish } = this.state;
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={1} />
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
                        <label htmlFor="project-type">Tegund plötu:</label>
                        <select 
                            className="form-control" 
                            name="project-type" 
                            id="project-type" 
                            value={projectType} 
                            onChange={(e) => this.setState({ projectType: parseInt(e.target.value) })}>
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
                        <label htmlFor="project-publish-country">Útgáfuland:</label>
                        <select 
                            name="project-publish-country" 
                            id="project-publish-country" 
                            className="form-control"
                            value={projectCountryOfPublish.code}
                            onChange={(e) => this.updateCountry(e)}>
                            {this.populateCountryOptions()}
                        </select>
                    </div>
                    <div className={projectType === 1 ? 'form-group' : 'hidden'}>
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
                            onClick={(e) => this.submitBasicInfo(e)}
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
        countries: state.common.countries
    };
};

export default connect(mapStateToProps, { getMainArtistsByCriteria, isFetchingList, hasStoppedFetchingList })(ProjectBasicInfo);