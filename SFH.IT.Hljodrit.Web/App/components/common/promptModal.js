import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import Spinner from 'react-spinner';

const PromptModal = ({ isOpen, title, content, confirmBtnText, confirmBtnCallback, confirmBtnDisabled, discardBtnText, discardBtnCallback, showConfirmSpinner }) => {
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
                        <span className="top-corner">
                            <a href="#" onClick={() => discardBtnCallback()}>
                                <i className="fa fa-times"></i>
                            </a>
                        </span>
                    </div>
                    <div className="modal-body">
                        <div>{content}</div>
                    </div>
                    <div className="modal-footer">
                        <div className="btn-group pull-right">
                            <button 
                                className="btn btn-default" 
                                onClick={() => discardBtnCallback()}>{discardBtnText}</button>
                            <button
                                disabled={confirmBtnDisabled}
                                className="btn btn-default btn-primary" 
                                onClick={() => confirmBtnCallback()}>
                                <span className={showConfirmSpinner ? 'visibility-hidden' : ''}>{confirmBtnText}</span>
                                <Spinner className={showConfirmSpinner ? 'spinner-small' : 'hidden'} />
                            </button>
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
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    confirmBtnText: PropTypes.string.isRequired,
    confirmBtnCallback: PropTypes.func.isRequired,
    discardBtnText: PropTypes.string.isRequired,
    discardBtnCallback: PropTypes.func.isRequired,
    showConfirmSpinner: PropTypes.bool,
    confirmBtnDisabled: PropTypes.bool
};

export default PromptModal;