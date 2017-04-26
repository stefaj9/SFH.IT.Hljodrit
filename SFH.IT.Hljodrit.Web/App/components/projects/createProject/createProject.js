import React from 'react';
import { connect } from 'react-redux';
import Steps from '../../common/steps';
import { updateProjectBasicInfo, updateProjectSongs, updateProjectPerformers, updateProjectProducers, createProject } from '../../../actions/projectActions';

class CreateProject extends React.Component {
    constructor() {
        super();
        this.state = {
            currentStep: 1,
            steps: [
                { name: 'Skrá plötuheiti', class: 'fa fa-pencil' },
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
                <Steps
                    steps={this.state.steps}
                    currentStep={this.state.currentStep} />
                <div>
                    <ProjectBasicInfo
                        isVisible={this.state.currentStep === 1}
                        steps={this.state.steps} 
                        close={() => this.exitWizard()}
                        next={(info) => { this.props.updateProjectBasicInfo(info); this.increaseStep(); } } />
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