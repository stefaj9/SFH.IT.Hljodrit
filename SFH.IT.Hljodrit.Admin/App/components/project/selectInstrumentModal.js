import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Chips from 'react-chips';
import _ from 'lodash';
import { getInstrumentSuggestions } from '../../actions/instrumentActions';

class SelectInstrumentModal extends React.Component {
    componentWillMount() {
        this.props.getInstrumentSuggestions();
    }
    componentWillReceiveProps(newProps) {
        if (!newProps.isOpen) {
            this.setState({ chips: [] });
        }
    }
    constructor() {
        super();
        this.state = {
            chips: []
        };
    }
    onChipsChange(chips) {
        this.setState({
            chips: chips
        });
    }
    updateInstruments() {
        let performer = _.cloneDeep(this.props.currentPerformer);
        performer.instruments = this.state.chips;
        this.props.update(performer);
        this.props.next();
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
                            <h4>Hljóðfæri</h4>
                            <p>Hægt er að velja meira en eitt hljóðfæri á valinn flytjanda. Lágmark er eitt hljóðfæri á hvern flytjanda.</p>
                            <Chips
                                value={this.state.chips}
                                onChange={this.onChipsChange.bind(this)}
                                suggestions={this.props.instrumentSuggestions} />
                        </div>
                        <div className="modal-footer">
                            <div className="btn-group pull-right">
                                <button className="btn btn-default" onClick={() => this.props.back()}>Til baka</button>
                                <button 
                                    disabled={this.state.chips.length === 0}
                                    className="btn btn-default btn-primary" 
                                    onClick={() => this.updateInstruments()}>Áfram</button>
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
        instrumentSuggestions: state.instrument.instrumentSuggestions
    };
};

export default connect(mapStateToProps, { getInstrumentSuggestions })(SelectInstrumentModal);