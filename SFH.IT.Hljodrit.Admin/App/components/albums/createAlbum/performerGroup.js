import React from 'react';
import { connect } from 'react-redux';
import { getPersonsByCriteria } from '../../../actions/personActions';
import { isFetchingList, hasStoppedFetchingList } from '../../../actions/flowActions';
import { saveGroupToCookie } from '../../../actions/cacheActions';
import _ from 'lodash';
import SelectPersonModal from '../../project/selectPersonModal';
import { toastr } from 'react-redux-toastr';

class PerformerGroup extends React.Component {
    componentWillReceiveProps(newProps) {
        this.setState({
            group: newProps.group
        });
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            isAddingPerson: false,
            selectedSongs: [],
            group: []
        }
    }
    addInstrumentToUser(e, performerId, idx) {
        let group = _.cloneDeep(this.state.group);
        let selectedPerformer = group[idx];

        let index = e.target.selectedIndex;

        selectedPerformer.instrument = { idCode: e.target.value, instrumentNameIcelandic: e.target.options[index].text };

        this.props.saveGroupToCookie(group);
    }
    addRoleToUser(e, performerId, idx) {
        let group = _.cloneDeep(this.state.group);
        let selectedPerformer = group[idx];
        let index = e.target.selectedIndex;
        selectedPerformer.role = { code: e.target.value, name: e.target.options[index].text };

        this.props.saveGroupToCookie(group);
    }
    openPerformerSelectionModal(e) {
        e.preventDefault();
        this.setState({ isAddingPerson: true });
    }
    addPerformerToGroup(performer) {
        let group = _.cloneDeep(this.state.group);

        performer.role = {
            code: 'MA',
            name: 'Aðal flytjandi'
        };

        performer.instrument = {
            idCode: 'JWF',
            instrumentNameIcelandic: 'Sjakúhatsjí (jap. langflauta); ýmsar þverflautur'
        };

        group = _.concat(group, performer);

        toastr.success('Tókst!', 'Það tókst að bæta við flytjanda í hóp.');

        this.props.saveGroupToCookie(group);
    }
    removePerformerFromGroup(e, performerId, idx) {
        e.preventDefault();
        let group = _.cloneDeep(this.state.group);
        _.remove(group, (member, index) => {
            return idx === index;
        });

        toastr.success('Tókst!', 'Það tókst að fjarlægja flytjanda úr hópnum.');

        this.props.saveGroupToCookie(group);
    }
    selectAllSongs(e) {
        let songs = [];
        if (e.target.checked) {
            this.props.songs.map((song) => {
                songs = _.concat(songs, { number: song.number, name: song.name });
            });
        }
        this.setState({ selectedSongs: songs });
    }
    selectSong(e, song) {
        let selectedSongs = _.cloneDeep(this.state.selectedSongs);
        if (e.target.checked) {
            selectedSongs = _.concat(selectedSongs, { number: song.number, name: song.name });
        } else {
            _.remove(selectedSongs, (s) => { return s.number === song.number });
        }
        this.setState({ selectedSongs: selectedSongs });
    }
    renderPerformerRoles() {
        return this.props.roles.map((role) => {
            return (
                <option key={role.code} value={role.code}>{role.name}</option>
            );
        });
    }
    renderPerformerInstruments() {
        return this.props.instrumentSuggestions.map(instrument => {
            return (
                <option key={instrument.idCode} value={instrument.idCode}>{instrument.instrumentNameIcelandic}</option>
            );
        });
    }
    renderGroup() {
        if (this.state.group.length > 0) {
            return this.state.group.map((member, idx) => {
                return (
                    <div key={`${member.id}-${member.name}-${idx}`} className="group text-center">
                        <h4>{member.name}</h4>
                        <label>Hlutverk</label>
                        <select 
                            name="group-member-role" 
                            id={`group-member-role-${member.id}`} 
                            className="form-control group-member-role"
                            onChange={(e) => this.addRoleToUser(e, member.id, idx)}
                            value={member.role.code}>
                            {this.renderPerformerRoles()}
                        </select>
                        <label>Hljóðfæri</label>
                        <select 
                            name="group-member-instrument" 
                            id="group-member-instrument"
                            className="form-control group-member-role"
                            onChange={(e) => this.addInstrumentToUser(e, member.id, idx)}
                            value={member.instrument.idCode}>
                            {this.renderPerformerInstruments()}
                        </select>
                        <div className="remove-performer-group-btn">
                            <button 
                                onClick={(e) => this.removePerformerFromGroup(e, member.id, idx)}
                                className="btn btn-default">Fjarlægja úr hóp
                                <i className="fa fa-times fa-fw"></i>
                            </button>
                        </div>
                    </div>
                );
            });
        } else {
            return (
                <h4 className="text-center">Hópurinn er tómur.</h4>
            );
        }
    }
    renderSongSelection() {
        return this.props.songs.map((song) => {
            return (
                <div key={`${song.number}-${song.name}`} className="checkbox">
                    <label>
                        <input 
                            type="checkbox" 
                            name={`${song.number}-${song.name}`} 
                            id={`${song.number}-${song.name}`}
                            value=""
                            onChange={(e) => this.selectSong(e, song)}
                            checked={_.find(this.state.selectedSongs, (s) => { return s.number === song.number })} />
                        {`${song.number}. ${song.name}`}
                    </label>
                </div>
            );
        });
    }
    transferGroupToSongs() {
        const { selectedSongs, group } = this.state;
        this.props.transfer(group, _.map(selectedSongs, 'number'));
        this.setState({ selectedSongs: [] });
    }
    render() {
        return (
            <div>
                <h4>Hópar</h4>
                <div className="row">
                    <div className="col-xs-12 text-right">
                        <button 
                            onClick={(e) => this.openPerformerSelectionModal(e)}
                            className="btn btn-default">
                            Bæta við í hóp <i className="fa fa-plus fa-fw"></i>
                        </button>
                    </div>
                </div>
                <div className="group-wrapper">
                    {this.renderGroup()}
                </div>
                <div className="song-list-wrapper">
                    <h4>Lög</h4>
                    <div className="checkbox">
                        <label>
                            <input 
                                type="checkbox"
                                value=""
                                checked={this.state.selectedSongs.length === this.props.songs.length}
                                onChange={(e) => this.selectAllSongs(e)} />Velja öll lög
                        </label>
                    </div>
                    {this.renderSongSelection()}
                    <div className="form-group pull-right">
                        <button onClick={() => this.transferGroupToSongs()} className="btn btn-default">Færa yfir <i className="fa fa-fw fa-arrow-right"></i></button>
                    </div>
                </div>
                <SelectPersonModal
                    isOpen={this.state.isAddingPerson}
                    close={() => this.setState({ isAddingPerson: false })}
                    next={() => this.setState({ isAddingPerson: false })}
                    registerPath="/api/persons"
                    envelope={this.props.performersEnvelope}
                    fetch={this.props.getPersonsByCriteria}
                    beginFetch={this.props.isFetchingList}
                    stoppedFetch={this.props.hasStoppedFetchingList}
                    update={(performer) => this.addPerformerToGroup(performer)}
                    steps={() => { return ( <h4>Velja flytjanda í hóp</h4> ) }} />
            </div>
        );
    }
}

PerformerGroup.propTypes = {
    songs: React.PropTypes.array.isRequired,
    transfer: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        instrumentSuggestions: state.instrument.instrumentSuggestions,
        roles: state.person.personRoles,
        performersEnvelope: state.person.personEnvelope,
        group: state.cache.group
    };
};

export default connect(mapStateToProps, { isFetchingList, hasStoppedFetchingList, getPersonsByCriteria, saveGroupToCookie })(PerformerGroup);