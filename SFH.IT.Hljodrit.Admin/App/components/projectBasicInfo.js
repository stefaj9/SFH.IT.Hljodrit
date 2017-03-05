import React from 'react';
import ModalSteps from './modalSteps';

export default class ProjectBasicInfo extends React.Component {
    constructor() {
        super();

        this.state = {
            projectName: '',
            projectType: 1,
            projectMainArtist: ''
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
        return projectType === 1 ? projectName.length > 0 && projectMainArtist.length > 0 : projectName.length > 0;
    }
    submitBasicInfo(e) {
        e.preventDefault();
        this.props.next(this.state);
    }
    render() {
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={1} />
                <h4>Grunnupplýsingar</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="project-name">Plötuheiti:</label>
                        <input 
                            type="text" 
                            value={this.state.projectName} 
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
                            value={this.state.projectType} 
                            onChange={(e) => this.setState({ projectType: parseInt(e.target.value) })}>
                                {this.populateOptions()}
                        </select>
                    </div>
                    <div className={this.state.projectType === 1 ? 'form-group' : 'hidden'}>
                        <label htmlFor="project-mainartist">Aðalflytjandi:</label>
                        <input 
                            type="text" 
                            id="project-mainartist" 
                            name="project-mainartist" 
                            className="form-control"
                            value={this.state.projectMainArtist}
                            onChange={(e) => this.setState({ projectMainArtist: e.target.value })} />
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
            </div>
        );
    }
}