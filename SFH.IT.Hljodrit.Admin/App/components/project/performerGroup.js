import React from 'react';
import Chips from 'react-chips';
import { connect } from 'react-redux';
import _ from 'lodash';

class PerformerGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            group: [{
                number: 1,
                name: 'Arnar Leifsson',
                role: '',
                instruments: []
            }, {
                number: 2,
                name: 'Björgvin Birkir Björgvinsson',
                role: '',
                instruments: []
            }, {
                number: 3,
                name: 'Baldur Tryggvason',
                role: '',
                instruments: []
            }]
        }
    }
    renderPerformerRoles() {
        return this.props.roles.map((role) => {
            return (
                <option key={role.roleCode} value={role.roleCode}>{role.roleName}</option>
            );
        });
    }
    addInstrument(instruments, number) {
        let group = _.cloneDeep(this.state.group);
    }
    renderGroup() {
        let suggestions = this.props.instrumentSuggestions;
        if (this.props.instrumentSuggestions.length > 0) {
            suggestions = _.forEach(this.props.instrumentSuggestions, (item) => {
                item.instrumentNameIcelandic = item.instrumentNameIcelandic.replace(',', ':');
            });
            suggestions = _.map(suggestions, 'instrumentNameIcelandic');
        }
        return this.state.group.map((member) => {
            return (
                <div key={`${member.number}-${member.name}`} className="group text-center">
                    <h4>{member.name}</h4>
                    <label>Hlutverk</label>
                    <select name="group-member-role" id={`group-member-role-${member.number}`} className="form-control group-member-role">
                        {this.renderPerformerRoles()}
                    </select>
                    <label>Hljóðfæri</label>
                    <Chips
                        value={member.instruments}
                        onChange={(instruments) => this.addInstrument(instruments, member.number)}
                        suggestions={suggestions} />
                </div>
            );
        });
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
                            className="btn btn-default">
                            <i className="fa fa-plus fa-fw"></i> Bæta við í hóp
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
        roles: state.person.personRoles
    };
};

export default connect(mapStateToProps, null)(PerformerGroup);