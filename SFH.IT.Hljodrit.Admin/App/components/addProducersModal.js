import React from 'react';
import Modal from 'react-modal';
import ModalSteps from './modalSteps';

export default class AddProducersModal extends React.Component {
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                className="modal-window"
                overlayClassName="modal-overlay"
                contentLabel="Modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header"><ModalSteps steps={this.props.steps} currentStep={4} /></div>
                        <div className="modal-body">AddProducersModal</div>
                        <div className="modal-footer">
                            <div className="btn-group">
                                <button 
                                    className="btn btn-default"
                                    onClick={() => this.props.back()}>Til baka</button>
                                <button 
                                    className="btn btn-default btn-primary" 
                                    onClick={() => this.props.next(this.state)}>Áfram
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}