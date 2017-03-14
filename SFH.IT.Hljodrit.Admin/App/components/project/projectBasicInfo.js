import React from 'react';
import ModalSteps from '../common/modalSteps';
import { toastr } from 'react-redux-toastr';
import SelectPersonModal from './selectPersonModal';

export default class ProjectBasicInfo extends React.Component {
    constructor() {
        super();

        this.state = {
            projectName: '',
            projectType: 1,
            projectMainArtist: {
                id: -1,
                name: ''
            },
            mainArtistModalIsOpen: false
        };
    }
    populateOptions() {
        // TODO: Populate with real data
        let options = ['Venjuleg plata', 'Safnplata', 'Single'];
        return options.map((option, idx) => {
            return (
                <option key={`${option}-${idx + 1}`} value={idx + 1}>{option}</option>
            );
        });
    }
    isValid() {
        const { projectType, projectName, projectMainArtist } = this.state;
        return projectType === 1 ? projectName.length > 0 && projectMainArtist.id !== -1 : projectName.length > 0;
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
        const { projectType, projectName, projectMainArtist, mainArtistModalIsOpen } = this.state;
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
                    next={() => this.setState({ mainArtistModalIsOpen: false })}
                    update={(artist) => this.addMainArtist(artist)}
                    steps={() => { return ( <h4>Bæta við aðalflytjanda</h4> ) } } />
            </div>
        );
    }
}