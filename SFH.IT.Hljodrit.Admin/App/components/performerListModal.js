import React from 'react';
import SelectPersonModal from './selectPersonModal';
import SelectInstrumentModal from './selectInstrumentModal';
import SelectRoleModal from './selectRoleModal';

export default class PerformerListModal extends React.Component {
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
            selectRoleModalOpen: false,
            performer: {
                id: -1,
                name: '',
                role: '',
                instruments: []
            }
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
    updatePerformer(performer) {
        this.setState({
            performer: performer
        });
    }
    renderSteps(step) {
        let steps = { one: '', two: '', three: '' };
        switch (step) {
            case 1: steps = { one: 'fa fa-dot-circle-o', two: 'fa fa-circle-o', three: 'fa fa-circle-o' }
                break;
            case 2: steps = { one: 'fa fa-check-circle-o', two: 'fa fa-dot-circle-o', three: 'fa fa-circle-o' }
                break;
            case 3: steps = { one: 'fa fa-check-circle-o', two: 'fa fa-check-circle-o', three: 'fa fa-dot-circle-o' }
                break;
        }
        return (
            <div className="modal-steps-wrapper">
                <div className="step">
                    <i className={steps.one}></i>
                    Bæta við flytjanda
                </div>
                <div className="step">
                    <i className={steps.two}></i>
                    Bæta við hljóðfæri
                </div>
                <div className="step">
                    <i className={steps.three}></i>
                    Bæta við hlutverki
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className={this.props.isOpen ? '' : 'hidden'}>
                <SelectPersonModal
                    isOpen={this.state.selectPersonModalOpen}
                    close={(e) => this.closeModal(e)}
                    next={() => this.openSelectInstrumentModal()}
                    currentPerformer={this.state.performer}
                    update={ (performer) => this.updatePerformer(performer) }
                    steps={ () => this.renderSteps(1) } />
                <SelectInstrumentModal
                    isOpen={this.state.selectInstrumentModalOpen}
                    close={(e) => this.closeModal(e)}
                    next={() => this.openSelectRoleModal()}
                    currentPerformer={this.state.performer}
                    update={(performer) => this.updatePerformer(performer)}
                    steps={ () => this.renderSteps(2) } />
                <SelectRoleModal
                    isOpen={this.state.selectRoleModalOpen}
                    close={(e) => this.closeModal(e)}
                    currentPerformer={this.state.performer}
                    update={(performer) => this.updatePerformer(performer)}
                    next={() => this.props.update(this.state.performer)}
                    steps={ () => this.renderSteps(3) } />
            </div>
        );
    }
}
