import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'elemental';
import { connect } from 'react-redux';
import { updateProjectBasicInfo, updateProjectSongs, updateProjectPerformers, updateProjectProducers, createProject } from '../actions/projectActions';
import ProjectBasicInfoModal from './projectBasicInfoModal';
import AddSongModal from './addSongModal';
import AddPerformersModal from './addPerformersModal';
import AddProducersModal from './addProducersModal';
import OverviewProjectModal from './overviewProjectModal';
import ModalSteps from './modalSteps';

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
    closeModal() {
        this.setState({
            currentStep: 1
        });
        this.props.close();
    }
    render() {
        const { currentStep } = this.state;
        return (
            <Modal isOpen={this.props.isOpen} width='large'>
                <ModalHeader
                    showCloseButton={true}
                    onClose={() => this.closeModal()}>
                    <ModalSteps steps={this.state.steps} currentStep={this.state.currentStep} />
                </ModalHeader>
                <ModalBody className='modal-body'>
                    <ProjectBasicInfoModal isVisible={currentStep === 1} next={this.props.updateProjectBasicInfo} />
                    <AddSongModal isVisible={currentStep === 2} next={this.props.updateProjectSongs} />
                    <AddPerformersModal isVisible={currentStep === 3} next={this.props.updateProjectPerformers} />
                    <AddProducersModal isVisible={currentStep === 4} next={this.props.updateProjectProducers} />
                    <OverviewProjectModal isVisible={currentStep === 5} next={this.props.createProject} />
                </ModalBody>
                <ModalFooter className='modal-footer'>
                    <div className="btn-group">
                        <button className="btn btn-default" disabled={currentStep === 1} onClick={() => this.setState({ currentStep: currentStep - 1 })}>Til baka</button>
                        <button className="btn btn-default btn-primary" disabled={currentStep === 5} onClick={() => this.setState({ currentStep: currentStep + 1 })}>Áfram</button>
                    </div>
                </ModalFooter>
            </Modal>
        );
    }
}

export default connect(null, { updateProjectBasicInfo, updateProjectSongs, updateProjectPerformers, updateProjectProducers, createProject })(AddProjectModal);