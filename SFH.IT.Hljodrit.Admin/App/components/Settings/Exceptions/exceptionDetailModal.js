import React from 'react';
import Modal from 'react-modal';

const ExceptionDetailModal = ({isOpen, exception, onClose}) => {
    return (
        <Modal
            isOpen={isOpen}
            contentLabel=""
            className="modal-window"
            overlayClass="modal-overlay">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        Details
                        <span className="top-corner">
                                <a href="#" onClick={() => onClose()}>
                                    <i className="fa fa-times"></i>
                                </a>
                            </span>
                    </div>
                    <div className="modal-body">
                    {exception.MachineName}
                    </div>
                </div>
            </div>

        </Modal>
    );
};

/*ExceptionDetailModal.propTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    exception: React.PropTypes.object.isRequired,
    onClose: React.PropTypes.func.isRequired
};*/

export default ExceptionDetailModal;