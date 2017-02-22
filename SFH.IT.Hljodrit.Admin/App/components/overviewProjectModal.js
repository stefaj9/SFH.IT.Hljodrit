import React from 'react';
import Modal from 'react-modal';
import ModalSteps from './modalSteps';

export default class OverviewProjectModal extends React.Component {
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                className="modal-window"
                overlayClassName="modal-overlay"
                contentLabel="Modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header"><ModalSteps steps={this.props.steps} currentStep={5} /></div>
                        <div className="modal-body">OverviewProjectModal</div>
                        <div className="modal-footer">
                            <div className="btn-group">
                                <button 
                                    className="btn btn-default"
                                    onClick={() => this.props.back()}>Til baka</button>
                                <button 
                                    className="btn btn-default btn-primary" 
                                    onClick={() => this.props.next(this.state)}>Staðfesta
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}