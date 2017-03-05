import React from 'react';
import Modal from 'react-modal';
import _ from 'lodash';

export default class SelectRoleModal extends React.Component {
    componentWillReceiveProps(newProps) {
        if (!newProps.isOpen) {
            this.setState({ role: '' });
        }
    }
    constructor() {
        super();
        this.state = {
            role: 'Aðalflytjandi'
        };
    }
    updateRole() {
        let performer = _.cloneDeep(this.props.currentPerformer);
        performer.role = this.state.role;
        this.props.update(performer);
        this.props.next(performer);
    }
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
                            <h4>Hlutverk flytjanda</h4>
                            <select name="" id="select-role" className="form-control" onChange={(e) => this.setState({ role: e.target.value })}>
                                <option value="Aðalflytjandi">Aðalflytjandi</option>
                                <option value="Hljómsveitarmeðlimur">Hljómsveitarmeðlimur</option>
                                <option value="Hljóðmaður">Hljóðmaður</option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <div className="btn-group pull-right">
                                <button className="btn btn-default" onClick={() => this.props.back()}>Til baka</button>
                                <button className="btn btn-default btn-primary" onClick={() => this.updateRole() }>Staðfesta</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}