import React from 'react';
import { connect } from 'react-redux';
import { updateProjectBasicInfo, updateProjectSongs, updateProjectPerformers, updateProjectProducers, createProject } from '../../actions/projectActions';
import { browserHistory } from 'react-router';
import ProjectBasicInfo from './projectBasicInfo';
import AddSong from './addSong';
import AddPerformers from './addPerformers';
import AddPublisher from './addPublisher';
import OverviewProject from './overviewProject';

class AddProject extends React.Component {
    constructor() {
        super();
        this.state = {
            steps: [
                { name: 'Skrá plötuheiti', class: 'fa fa-pencil' },
                { name: 'Skrá útgefanda', class: 'fa fa-user' },
                { name: 'Skrá lög', class: 'fa fa-music' },
                { name: 'Skrá flytjendur', class: 'fa fa-microphone' },
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
    exitWizard() {
        this.setState({
            currentStep: 1
        });
        browserHistory.push('/projects');
    }
    render() {
        return (
            <div>
                <ProjectBasicInfo
                    isVisible={this.state.currentStep === 1}
                    steps={this.state.steps} 
                    close={() => this.exitWizard()}
                    next={(info) => { this.props.updateProjectBasicInfo(info); this.increaseStep(); } } />
                <AddPublisher
                    isVisible={this.state.currentStep === 2}
                    steps={this.state.steps} 
                    close={() => this.exitWizard()}
                    next={(producers) => { this.props.updateProjectProducers(producers); this.increaseStep(); } }
                    back={() => this.decreaseStep()} />
                <AddSong
                    isVisible={this.state.currentStep === 3}
                    steps={this.state.steps}
                    close={() => this.exitWizard()}
                    isrcPrefix={`${this.props.project.basicInfo.projectCountryOfPublish.code}-${this.props.project.publisher.labelName}-${this.props.project.basicInfo.projectYearOfPublish.toString().substring(2)}-`}
                    next={(songs) => { this.props.updateProjectSongs(songs); this.increaseStep(); } }
                    back={() => this.decreaseStep()} />
                <AddPerformers
                    isVisible={this.state.currentStep === 4}
                    steps={this.state.steps} 
                    close={() => this.exitWizard()}
                    songs={this.props.project.songs}
                    next={(performers) => { this.props.updateProjectPerformers(performers); this.increaseStep(); } }
                    back={() => this.decreaseStep()} />
                <OverviewProject
                    isVisible={this.state.currentStep === 5}
                    steps={this.state.steps} 
                    close={() => this.exitWizard()}
                    next={(project) => { this.props.createProject(project); this.exitWizard(); } }
                    back={() => this.decreaseStep()} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        project: state.project.selectedProject
    };
};

export default connect(mapStateToProps, { updateProjectBasicInfo, updateProjectSongs, updateProjectPerformers, updateProjectProducers, createProject })(AddProject);