import React, { PropTypes } from 'react';
import Modal from 'react-modal';

const PromptModal = ({ isOpen, title, content, confirmBtnText, confirmBtnCallback, discardBtnText, discardBtnCallback }) => {
    return (
        <Modal
            isOpen={isOpen}
            contentLabel=""
            className="modal-window"
            overlayClass="modal-overlay">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>{title}</h4>
                    </div>
                    <div className="modal-body">
                        <p>{content}</p>
                    </div>
                    <div className="modal-footer">
                        <div className="btn-group pull-right">
                            <button 
                                className="btn btn-default" 
                                onClick={() => discardBtnCallback()}>{discardBtnText}</button>
                            <button
                                className="btn btn-default btn-primary" 
                                onClick={() => confirmBtnCallback()}>{confirmBtnText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

PromptModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    confirmBtnText: PropTypes.string.isRequired,
    confirmBtnCallback: PropTypes.func.isRequired,
    discardBtnText: PropTypes.string.isRequired,
    discardBtnCallback: PropTypes.func.isRequired
};

export default PromptModal;