import React from 'react';
import { connect } from 'react-redux';
import { getPersonRoles } from '../../actions/personActions';
import Modal from 'react-modal';
import _ from 'lodash';

class SelectRoleModal extends React.Component {
    componentWillReceiveProps(newProps) {
        if (!newProps.isOpen) {
            this.setState({ role: '' });
        }
    }
    componentWillMount() {
        this.props.getPersonRoles();
    }
    constructor() {
        super();
        this.state = {
            role: { code: 'ART', name: 'Aðalflytjandi' }
        };
    }
    updateRole() {
        let performer = _.cloneDeep(this.props.currentPerformer);
        performer.role = this.state.role;
        this.props.update(performer);
        this.props.next(performer);
    }
    onSelect(e) {
        let index = e.target.selectedIndex;
        this.setState({
            role: { code: e.target.value, name: e.target.options[index].text }
        });
    }
    renderOptions() {
        return this.props.roles.map((role) => {
            return (
                <option key={role.roleCode} value={role.roleCode}>{role.roleName}</option>
            );
        });
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
                            <select name="select-role" id="select-role" className="form-control" onChange={this.onSelect.bind(this)}>
                                {this.renderOptions()}
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

function mapStateToProps(state) {
    return {
        roles: state.person.personRoles
    };
};

export default connect(mapStateToProps, { getPersonRoles })(SelectRoleModal);
