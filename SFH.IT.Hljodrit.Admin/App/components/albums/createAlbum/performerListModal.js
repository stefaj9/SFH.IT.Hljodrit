import React from 'react';
import { connect } from 'react-redux';
import SelectPersonModal from '../../project/selectPersonModal';
import SelectInstrumentModal from '../../project/selectInstrumentModal';
import SelectRoleModal from '../../project/selectRoleModal';
import { getPersonsByCriteria } from '../../../actions/personActions';
import { isFetchingList, hasStoppedFetchingList } from '../../../actions/flowActions';

class PerformerListModal extends React.Component {
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
                    registerPath="/api/persons"
                    envelope={this.props.performersEnvelope}
                    fetch={this.props.getPersonsByCriteria}
                    beginFetch={this.props.isFetchingList}
                    stoppedFetch={this.props.hasStoppedFetchingList}
                    update={ (performer) => this.updatePerformer(performer) }
                    steps={ () => this.renderSteps(1) } />
                <SelectInstrumentModal
                    isOpen={this.state.selectInstrumentModalOpen}
                    close={(e) => this.closeModal(e)}
                    back={() => this.openSelectPersonModal()}
                    next={() => this.openSelectRoleModal()}
                    currentPerformer={this.state.performer}
                    update={(performer) => this.updatePerformer(performer)}
                    steps={ () => this.renderSteps(2) } />
                <SelectRoleModal
                    isOpen={this.state.selectRoleModalOpen}
                    close={(e) => this.closeModal(e)}
                    currentPerformer={this.state.performer}
                    update={(performer) => this.updatePerformer(performer)}
                    back={() => this.openSelectInstrumentModal()}
                    next={(performer) => this.props.update(performer)}
                    steps={ () => this.renderSteps(3) } />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        performersEnvelope: state.person.personEnvelope
    };
};

export default connect(mapStateToProps, { getPersonsByCriteria, isFetchingList, hasStoppedFetchingList })(PerformerListModal);