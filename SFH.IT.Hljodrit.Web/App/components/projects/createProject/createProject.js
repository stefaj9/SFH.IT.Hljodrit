import React from 'react';
import { connect } from 'react-redux';
import ProjectBasicInfo from './projectBasicInfo';
import AddPublisher from './addPublisher';
import AddSong from './addSong';
import AddPerformers from './addPerformers';
import ProjectOverview from './projectOverview';
import { updateProjectBasicInfo, updateProjectSongs, updateProjectPerformers, updateProjectProducers, createProject } from '../../../actions/projectActions';

class CreateProject extends React.Component {
    constructor() {
        super();
        this.state = {
            currentStep: 1,
            steps: [
                { name: 'Skrá verkefni', class: 'fa fa-pencil' },
                { name: 'Skrá útgefanda', class: 'fa fa-user' },
                { name: 'Skrá lög', class: 'fa fa-music' },
                { name: 'Skrá flytjendur', class: 'fa fa-microphone' },
                { name: 'Staðfesting', class: 'fa fa-check' }
            ]
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
                <h2>Búa til nýtt verkefni</h2>
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
                        isrcPrefix={`${this.props.project.basicInfo.projectCountryOfPublish.code}-${this.props.project.publisher.isrcOrganizationPart}-${this.props.project.basicInfo.projectYearOfPublish.toString().substring(2)}-`}
                        lastUsedIsrc={this.props.project.publisher.lastUsedIsrc}
                        next={(songs) => { this.props.updateProjectSongs(songs); this.increaseStep(); } }
                        back={() => this.decreaseStep()} />
                    <AddPerformers
                        isVisible={this.state.currentStep === 4}
                        steps={this.state.steps} 
                        close={() => this.exitWizard()}
                        songs={this.props.project.songs}
                        next={(performers) => { this.props.updateProjectPerformers(performers); this.increaseStep(); } }
                        back={() => this.decreaseStep()} />
                    <ProjectOverview
                        isVisible={this.state.currentStep === 5}
                        steps={this.state.steps} 
                        close={() => this.exitWizard()}
                        next={(project) => { this.createProject(project); } }
                        back={() => this.decreaseStep()} />
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        project: state.project.projectToCreate,
        isCreatingProject: state.project.isCreatingProject
    };
};

export default connect(mapStateToProps, { updateProjectBasicInfo, updateProjectSongs, updateProjectPerformers, updateProjectProducers, createProject })(CreateProject);