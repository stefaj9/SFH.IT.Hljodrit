import React from 'react';
import Modal from 'react-modal';

export default class SelectRoleModal extends React.Component {
    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen}
                contentLabel=""
                className="modal-window"
                overlayClass="modal-overlay">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            { this.props.steps() }
                            <span className="top-corner">
                                <a href="#" onClick={(e) => this.props.close(e)}>
                                    <i className="fa fa-times"></i>
                                </a>
                            </span>
                        </div>
                        <div className="modal-body">
                            SelectInstrumentModal
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}