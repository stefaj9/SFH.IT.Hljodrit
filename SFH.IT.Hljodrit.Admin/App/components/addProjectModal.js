import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'elemental';
import ProjectBasicInfoModal from './projectBasicInfoModal';
import AddSongModal from './addSongModal';
import AddPerformersModal from './addPerformersModal';
import AddProducersModal from './addProducersModal';
import OverviewProjectModal from './overviewProjectModal';
import ModalSteps from './modalSteps';

export default class AddProjectModal extends React.Component {
    constructor() {
        super();
        this.state = {
            steps :[
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
            <Modal isOpen={this.props.isOpen}>
                <ModalHeader
                    showCloseButton={true}
                    onClose={() => this.closeModal()}>
                    <ModalSteps steps={this.state.steps} currentStep={this.state.currentStep} />
                </ModalHeader>
                <ModalBody>
                    <ProjectBasicInfoModal isVisible={currentStep === 1} />
                    <AddSongModal isVisible={currentStep === 2} />
                    <AddPerformersModal isVisible={currentStep === 3} />
                    <AddProducersModal isVisible={currentStep === 4} />
                    <OverviewProjectModal isVisible={currentStep === 5} />
                </ModalBody>
                <ModalFooter>
                    <div className="btn-group">
                        <button className="btn btn-default" disabled={currentStep === 1} onClick={() => this.setState({ currentStep: currentStep - 1 })}>Til baka</button>
                        <button className="btn btn-default btn-primary" disabled={currentStep === 5} onClick={() => this.setState({ currentStep: currentStep + 1 })}>Áfram</button>
                    </div>
                </ModalFooter>
            </Modal>
        );
    }
}