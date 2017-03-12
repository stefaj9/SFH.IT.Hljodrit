import React, {PropTypes} from 'react';
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
                                <i className="fa fa-times" />
                            </a>
                        </span>
                    </div>
                    <div className="modal-body">
                        <div className="list well row">
                            <div className="list-info col-md-12 col-xs-12">
                                <div className="list-name">
                                    <div className="title">Level:</div>
                                    <div className="value">{exception.Level}</div>
                                </div>
                                <div className="list-author">
                                    <div className="title">Logged:</div>
                                    <div className="value">{exception.Logged}</div>
                                </div>
                                <div className="list-author">
                                    <div className="title">Machine name:</div>
                                    <div className="value">{exception.MachineName}</div>
                                </div>
                                <div className="list-author">
                                    <div className="title">Url:</div>
                                    <div className="value">{exception.Url}</div>
                                </div>
                                <div className="list-name">
                                    <div className="title">Callsite:</div>
                                    <div className="value">{exception.Callsite}</div>
                                </div>
                                <div className="list-name">
                                    <div className="title">Logger:</div>
                                    <div className="value">{exception.Logger}</div>
                                </div>
                                <div className="list-name">
                                    <div className="title">Level:</div>
                                    <div className="value">{exception.Level}</div>
                                </div>
                                <div className="list-name">
                                    <div className="title">Port:</div>
                                    <div className="value">{exception.Port}</div>
                                </div>
                                <div className="list-name">
                                    <div className="title">Remote address:</div>
                                    <div className="value">{exception.RemoteAddress}</div>
                                </div>
                                <div className="list-name">
                                    <div className="title">Server address:</div>
                                    <div className="value">{exception.ServerAddress}</div>
                                </div>
                                <div className="list-name">
                                    <div className="title">Server name:</div>
                                    <div className="value">{exception.ServerName}</div>
                                </div>
                                <div className="list-name">
                                    <div className="title">Site name:</div>
                                    <div className="value">{exception.SiteName}</div>
                                </div>
                                <div className="list-name">
                                    <div className="title">Username:</div>
                                    <div className="value">{exception.UserName}</div>
                                </div>
                                <div className="list-name">
                                    <div className="title">Exception:</div>
                                    <div className="value">{exception.Exception}</div>
                                </div>
                                <div className="list-name">
                                    <div className="title">Message:</div>
                                    <div className="value">{exception.Message}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

ExceptionDetailModal.protoTypes = {
    isOpen: PropTypes.bool.isRequired,
    exception: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ExceptionDetailModal;