import React from 'react';
import SelectPersonModal from './selectPersonModal';
import SelectInstrumentModal from './selectInstrumentModal';
import SelectRoleModal from './selectRoleModal';

export default class PeopleListModal extends React.Component {
    componentWillReceiveProps(newProps) {
        if (newProps.isOpen) {
            this.openSelectPersonModal();
        } else {
            this.setState({
                selectPersonModalOpen: false,
                selectInstrumentModalOpen: false,
                selectRoleModalOpen: false
            });
        }
    }
    constructor() {
        super();
        this.state = {
            selectPersonModalOpen: false,
            selectInstrumentModalOpen: false,
            selectRoleModalOpen: false
        };
    }
    closeModal(e) {
        e.preventDefault();
        this.setState({
            selectPersonModalOpen: false,
            selectInstrumentModalOpen: false,
            selectRoleModalOpen: false
        });
        this.props.close();
    }
    openSelectPersonModal() {
        this.setState({
            selectPersonModalOpen: true,
            selectInstrumentModalOpen: false,
            selectRoleModalOpen: false
        });
    }
    openSelectInstrumentModal() {
        this.setState({
            selectPersonModalOpen: false,
            selectInstrumentModalOpen: true,
            selectRoleModalOpen: false
        });
    }
    openSelectRoleModal() {
        this.setState({
            selectPersonModalOpen: false,
            selectInstrumentModalOpen: false,
            selectRoleModalOpen: true
        });
    }
    render() {
        return (
            <div className={this.props.isOpen ? '' : 'hidden'}>
                <SelectPersonModal
                    isOpen={this.state.selectPersonModalOpen}
                    close={(e) => this.closeModal(e)}
                    next={() => this.openSelectInstrumentModal}
                    update={ (person) => this.props.update(person) } />
                <SelectInstrumentModal
                    isOpen={this.state.selectInstrumentModalOpen}
                    close={(e) => this.closeModal(e)}
                    next={() => this.openSelectRoleModal()} />
                <SelectRoleModal
                    isOpen={this.state.selectRoleModalOpen}
                    close={(e) => this.closeModal(e)}
                    next={(e) => this.closeModal(e)} />
            </div>
        );
    }
}
