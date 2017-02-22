import React from 'react';
import { connect } from 'react-redux';
import { updateProjectBasicInfo, updateProjectSongs, updateProjectPerformers, updateProjectProducers, createProject } from '../actions/projectActions';
import ProjectBasicInfoModal from './projectBasicInfoModal';
import AddSongModal from './addSongModal';
import AddPerformersModal from './addPerformersModal';
import AddProducersModal from './addProducersModal';
import OverviewProjectModal from './overviewProjectModal';


class AddProjectModal extends React.Component {
    constructor() {
        super();
        this.state = {
            steps: [
                { name: 'Skrá plötuheiti', class: 'fa fa-bath' },
                { name: 'Skrá lög', class: 'fa fa-music' },
                { name: 'Skrá flytjendur', class: 'fa fa-microphone' },
                { name: 'Skrá framleiðendur', class: 'fa fa-user' },
                { name: 'Staðfesting', class: 'fa fa-check' }
            ],
            currentStep: 1
        };
    }
    increaseStep() {
        this.setState({
            currentStep: this.state.currentStep + 1
        });
    }
    decreaseStep() {
        this.setState({
            currentStep: this.state.currentStep - 1
        });
    }
    closeModal() {
        this.setState({
            currentStep: 1
        });
        this.props.close();
    }
    render() {
        return (
            <div>
                <ProjectBasicInfoModal 
                    steps={this.state.steps} 
                    close={() => this.closeModal()}
                    isOpen={this.props.isGlobalOpen && this.state.currentStep === 1}
                    next={(info) => { this.props.updateProjectBasicInfo(info); this.increaseStep(); } } />
                <AddSongModal 
                    steps={this.state.steps} 
                    close={() => this.closeModal()}
                    isOpen={this.props.isGlobalOpen && this.state.currentStep === 2}
                    next={(songs) => { this.props.updateProjectSongs(songs); this.increaseStep(); } }
                    back={() => this.decreaseStep()} />
                <AddPerformersModal 
                    steps={this.state.steps} 
                    close={() => this.closeModal()}
                    isOpen={this.props.isGlobalOpen && this.state.currentStep === 3}
                    next={(performers) => { this.props.updateProjectPerformers(performers); this.increaseStep(); } }
                    back={() => this.decreaseStep()} />
                <AddProducersModal 
                    steps={this.state.steps} 
                    close={() => this.closeModal()}
                    isOpen={this.props.isGlobalOpen && this.state.currentStep === 4}
                    next={(producers) => { this.props.updateProjectProducers(producers); this.increaseStep(); } }
                    back={() => this.decreaseStep()} />
                <OverviewProjectModal 
                    steps={this.state.steps} 
                    close={() => this.closeModal()}
                    isOpen={this.props.isGlobalOpen && this.state.currentStep === 5}
                    next={(project) => { this.props.createProject(project); this.closeModal(); } }
                    back={() => this.decreaseStep()} />
            </div>
        );
    }
}

export default connect(null, { updateProjectBasicInfo, updateProjectSongs, updateProjectPerformers, updateProjectProducers, createProject })(AddProjectModal);