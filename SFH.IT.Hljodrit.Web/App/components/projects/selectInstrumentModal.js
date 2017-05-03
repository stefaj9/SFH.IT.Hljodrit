import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import _ from 'lodash';
import { getInstrumentSuggestions } from '../../actions/instrumentActions';

class SelectInstrumentModal extends React.Component {
    componentWillMount() {
        this.props.getInstrumentSuggestions();
    }
    constructor() {
        super();
        this.state = {
            selectedInstrument: {
                idCode: '',
                instrumentNameIcelandic: 'Ekkert valið'
            }
        };
    }
    updateInstruments() {
        let performer = _.cloneDeep(this.props.currentPerformer);
        performer.instrument = this.state.selectedInstrument;
        this.props.update(performer);
        this.props.next();
    }
    selectInstrument(e) {
        let index = e.target.selectedIndex;
        this.setState({
            selectedInstrument: {
                idCode: e.target.value,
                instrumentNameIcelandic: e.target.options[index].text
            }
        });
    }
    renderInstrumentSuggestions() {
        return this.props.instrumentSuggestions.map(instrument => {
            return (
                <option key={instrument.idCode} value={instrument.idCode}>{instrument.instrumentNameIcelandic}</option>
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
                    <div className="modal-content overflow-y-off">
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
                            <div className="form-group">
                                <select 
                                    name="select-instrument" 
                                    id="select-instrument" 
                                    className="form-control"
                                    onChange={(e) => this.selectInstrument(e)}>
                                    <option value="">Ekkert valið</option>
                                    {this.renderInstrumentSuggestions()}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="btn-group pull-right">
                                <button className="btn btn-default" onClick={() => this.props.back()}>Til baka</button>
                                <button 
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