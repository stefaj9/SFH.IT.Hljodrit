import React from 'react';
import { connect } from 'react-redux';
import SongTableData from './songTableData';
import Table from '../common/table';
import { createPromise } from '../../helpers/promiseWrapper';
import { removeMusiciansFromSong } from '../../actions/songActions';

class SongMusiciansTable extends React.Component {
    componentWillReceiveProps(newProps) {
        if (newProps.musicians.length > 0) {
            this.setState({
                musicians: newProps.musicians
            }, () => this.buildMusicians());
        }
    }
    constructor() {
        super();
        this.state = {
            selectedMusicians: [],
            rowsToUpdate: [],
            musicians: []
        }
    }
    addToListOfSelectedMusicians(musicians, status) {
        let selectedMusicians = _.cloneDeep(this.state.selectedMusicians);
        if (!status) {
            // The musicians are being removed
            _.forEach(musicians, (musician) => {
                _.remove(selectedMusicians, (m) => { return m.id === musician.id });
            });
        } else {
            selectedMusicians = _.concat(selectedMusicians, musicians);
        }
        this.setState({ selectedMusicians: selectedMusicians });
    }
    removeMusiciansFromSong() {
        this.props.removeMusiciansFromSong(this.props.albumId, this.props.songId, this.state.selectedMusicians.map((m) => { return m.musicianId } ));
        this.setState({ selectedMusicians: [] });
    }
    renderRoles() {
        return this.props.roles.map((role) => {
            return (
                <option key={role.code} value={role.code}>{role.name}</option>
            );
        });
    }
    renderInstruments() {
        return this.props.instrumentSuggestions.map((suggestion) => {
            return (
                <option key={suggestion.idCode} value={suggestion.idCode}>{suggestion.instrumentNameIcelandic}</option>
            );
        });
    }
    updateMusicianRole(e, rowNumber, musicianId) {
        let musicians = _.cloneDeep(this.state.musicians);
        let musician = _.find(musicians, (m) => { return m.musicianId === musicianId });

        musician.role = <select value={ e.target.value } className="form-control" onChange={(e) => this.updateMusicianRole(e, rowNumber, musicianId)}>{this.renderRoles()}</select>;

        let promise = createPromise(() => this.markRowAsChanged(rowNumber, () => this.updateAction(rowNumber, musician)));
        promise.then(() => this.setState({ musicians: musicians }));
    }
    updateMusicianInstrument(e, rowNumber, musicianId) {
        let musicians = _.cloneDeep(this.state.musicians);
        let musician = _.find(musicians, (m) => { return m.musicianId === musicianId });

        musician.instruments = <select value={ e.target.value } onChange={(e) => this.updateMusicianInstrument(e, rowNumber, musicianId)} className="form-control" >{this.renderInstruments()}</select>;

        let promise = createPromise(() => this.markRowAsChanged(rowNumber, () => this.updateAction(rowNumber, musician)));
        promise.then(() => this.setState({ musicians: musicians }));
    }
    updateAction(rowNumber, musician) {
        musician.action = <i title="Breyta" className={'fa fa-check fa-fw hover-cursor' + (this.isRowActionDisabled(rowNumber) ? ' fa-greyed-out' : ' fa-green')} onClick={() => this.updateMusician(musician, !this.isRowActionDisabled(rowNumber))}></i>;
    }
    markRowAsChanged(rowNumber, callback) {
        let rowsToUpdate = _.cloneDeep(this.state.rowsToUpdate);
        if (!_.find(rowsToUpdate, (row) => { return row === rowNumber })) {
            rowsToUpdate = _.concat(rowsToUpdate, rowNumber);
            this.setState({ rowsToUpdate: rowsToUpdate }, () => callback());
        }
    }
    isRowActionDisabled(rowNumber) {
        return !_.find(this.state.rowsToUpdate, (row) => { return row === rowNumber });
    }
    updateMusician(musician, hasChanged, rowNumber) {
        if (hasChanged) {
            // Should update musician and remove the rowNumber from the rowsToUpdate state prop
            console.log(musician);
        }
    }
    buildMusicians() {
        let musicians = _.cloneDeep(this.state.musicians);
        _.forEach(musicians, (musician, idx) => {
            let rowNumber = idx + 1;

            musician.role = <select value={musician.role[0].code} className="form-control" onChange={(e) => this.updateMusicianRole(e, rowNumber, musician.musicianId)}>{this.renderRoles()}</select>;

            musician.instruments = <select value={musician.instruments[0].code} onChange={(e) => this.updateMusicianInstrument(e, rowNumber, musician.musicianId)} className="form-control" >{this.renderInstruments()}</select>;

            musician.action = <i title="Breyta" className={'fa fa-check fa-fw hover-cursor' + (this.isRowActionDisabled(rowNumber) ? ' fa-greyed-out' : ' fa-green')} onClick={() => this.updateMusician(musician, !this.isRowActionDisabled(rowNumber), rowNumber)}></i>;
        });
        this.setState({
            musicians: musicians
        });
    }
    render() {
        return (
            <div className="row">
                <Table
                    tableData={SongTableData}
                    objects={this.state.musicians}
                    selectRow={true}
                    selectRowMode="checkbox"
                    selectRowCallback={(row, status) => this.addToListOfSelectedMusicians([row], status)}
                    selectRowCallBackAll={(status, rows) => this.addToListOfSelectedMusicians(rows, status)} />
                <div className="col-xs-12 text-right">
                    <div className="btn-group">
                        <button 
                            disabled={this.state.selectedMusicians.length === 0}
                            className="btn btn-default btn-primary"
                            onClick={() => this.removeMusiciansFromSong()}>
                            <i className="fa fa-times"></i> Eyða völdum flytjendum
                        </button>
                        <button 
                            className="btn btn-default btn-primary"
                            onClick={(e) => this.props.addMusicianToSong(e)}>
                            <i className="fa fa-plus"></i> Bæta við flytjanda
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

SongMusiciansTable.propTypes = {
    albumId: React.PropTypes.string.isRequired,
    songId: React.PropTypes.string.isRequired,
    musicians: React.PropTypes.array.isRequired,
    addMusicianToSong: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        instrumentSuggestions: state.instrument.instrumentSuggestions,
        roles: state.person.personRoles
    };
};

export default connect(mapStateToProps, { removeMusiciansFromSong })(SongMusiciansTable);