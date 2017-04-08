import React from 'react';
import Chips from 'react-chips';
import { connect } from 'react-redux';
import { getPersonsByCriteria } from '../../actions/personActions';
import { isFetchingList, hasStoppedFetchingList } from '../../actions/flowActions';
import _ from 'lodash';
import SelectPersonModal from './selectPersonModal';
import { toastr } from 'react-redux-toastr';

class PerformerGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isAddingPerson: false,
            currentNumber: 0,
            group: []
        }
    }
    addInstrument(instruments, performerId) {
        let group = _.cloneDeep(this.state.group);
        let selectedPerformer = _.find(group, (member) => { return member.id === performerId });
        selectedPerformer.instruments = instruments;

        this.setState({ group: group });
    }
    addRoleToUser(e, performerId) {
        let group = _.cloneDeep(this.state.group);
        let selectedPerformer = _.find(group, (member) => { return member.id === performerId });
        let index = e.target.selectedIndex;
        selectedPerformer.role.code = e.target.value;
        selectedPerformer.role.name = e.target.options[index].text;

        this.setState({ group: group });
    }
    openPerformerSelectionModal(e) {
        e.preventDefault();
        this.setState({ isAddingPerson: true });
    }
    addPerformerToGroup(performer) {
        if (this.props.roles.length > 0) {
            let firstRole = this.props.roles[0];
            performer.role = { code: firstRole.roleCode, name: firstRole.roleName }
        } else {
            performer.role = {};
        }
        
        performer.instruments = [];
        let group = _.cloneDeep(this.state.group);

        // Prevent adding a performer which is already in the group.
        if (_.find(group, (member) => { return member.id === performer.id })) {
            toastr.error('Villa!', 'Ekki er hægt að bæta við flytjanda sem er nú þegar í hópnum.');
            return;
        }

        group = _.concat(group, performer);

        toastr.success('Tókst!', 'Það tókst að bæta við flytjanda í hóp.');

        this.setState({ group: group });
    }
    removePerformerFromGroup(e, performerId) {
        e.preventDefault();
        let group = _.cloneDeep(this.state.group);
        _.remove(group, (member) => {
            return member.id === performerId;
        });

        toastr.success('Tókst!', 'Það tókst að fjarlægja flytjanda úr hópnum.');

        this.setState({ group: group });
    }
    renderPerformerRoles() {
        return this.props.roles.map((role) => {
            return (
                <option key={role.roleCode} value={role.roleCode}>{role.roleName}</option>
            );
        });
    }
    renderGroup() {
        let suggestions = this.props.instrumentSuggestions;
        if (this.props.instrumentSuggestions.length > 0) {
            suggestions = _.forEach(this.props.instrumentSuggestions, (item) => {
                item.instrumentNameIcelandic = item.instrumentNameIcelandic.replace(',', ':');
            });
            suggestions = _.map(suggestions, 'instrumentNameIcelandic');
        }
        if (this.state.group.length > 0) {
            return this.state.group.map((member) => {
                return (
                    <div key={`${member.id}-${member.name}`} className="group text-center">
                        <h4>{member.name}</h4>
                        <label>Hlutverk</label>
                        <select 
                            name="group-member-role" 
                            id={`group-member-role-${member.id}`} 
                            className="form-control group-member-role"
                            onChange={(e) => this.addRoleToUser(e, member.id)}
                            value={member.role.code}>
                            {this.renderPerformerRoles()}
                        </select>
                        <label>Hljóðfæri</label>
                        <Chips
                            value={member.instruments}
                            onChange={(instruments) => this.addInstrument(instruments, member.id)}
                            suggestions={suggestions} />
                        <div className="remove-performer-group-btn">
                            <button 
                                onClick={(e) => this.removePerformerFromGroup(e, member.id)}
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
                            value="" />
                        {`${song.number}. ${song.name}`}
                    </label>
                </div>
            );
        });
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
                            <input type="checkbox" value="" />Velja öll lög
                        </label>
                    </div>
                    {this.renderSongSelection()}
                    <div className="form-group pull-right">
                        <button className="btn btn-default">Færa yfir <i className="fa fa-arrow-right"></i></button>
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
    songs: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        instrumentSuggestions: state.instrument.instrumentSuggestions,
        roles: state.person.personRoles,
        performersEnvelope: state.person.personEnvelope
    };
};

export default connect(mapStateToProps, { isFetchingList, hasStoppedFetchingList, getPersonsByCriteria })(PerformerGroup);