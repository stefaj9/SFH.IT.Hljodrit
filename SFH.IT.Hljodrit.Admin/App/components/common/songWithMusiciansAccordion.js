import React, { PropTypes } from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';
import PerformerListModal from '../project/performerListModal';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';

class SongWithMusiciansAccordion extends React.Component {
    constructor() {
        super();
        this.state = {
            addPerformerModalIsOpen: false,
            selectedSong: -1
        }
    }
    openAddPerformerModal(songId) {
        this.setState({
            addPerformerModalIsOpen: true,
            selectedSong: songId
        });
    }
    addPerformer(performer, number) {
        const { songs } = this.props;
        let songsCopy = _.cloneDeep(songs);
        let song = _.find(songsCopy, (item) => {
            return item.number === number;
        });

        if (_.find(song.performers, (p) => { return p.id === performer.id })) {
            toastr.error('Villa!', 'Ekki er hægt að bæta við sama flytjanda oftar en einu sinni');
            return;
        }

        if (song) {
            // The song has already been added
            song.performers = _.concat(song.performers, { id: performer.id, name: performer.name, instruments: performer.instruments, role: { code: performer.role.code, name: performer.role.name } });
        } else {
            songsCopy = _.concat(songsCopy, {
                number: number,
                name: song.name,
                length: song.length,
                isrc: song.isrc,
                performers: [ { id: performer.id, name: performer.name, instruments: performer.instruments, role: { code: performer.role.code, name: performer.role.name } } ]
            });
        }

        this.props.updateState({ songs: songsCopy });
        this.setState({ addPerformerModalIsOpen: false });

        toastr.success('Tókst!', 'Það tókst að bæta við flytjanda á lagið');
    }
    removePerformerFromSong(e, number, performerId) {
        e.preventDefault();
        let allSongs = _.cloneDeep(this.props.songs);
        let song = _.find(allSongs, (item) => {
            return item.number === number;
        });

        _.remove(song.performers, (performer) => {
            return performer.id === performerId;
        });

        this.setState({ addPerformerModalIsOpen: false });
        this.props.updateState({ songs: allSongs });

        toastr.success('Tókst!', 'Það tókst að fjarlægja flytjanda af laginu');
    }
    renderSongs() {
        return this.props.songs.map((song, idx) => {
            let displayPerformers = song.performers.map((performer) => {
                let instruments = _.join(performer.instruments, ', ');
                return (
                    <tr key={`${song.number}-${performer.id}-${performer.role.code}`}>
                        <td>{performer.name}</td>
                        <td>{instruments}</td>
                        <td>{performer.role.name}</td>
                        <td>
                            <a href="#" onClick={(e) => this.removePerformerFromSong(e, song.number, performer.id)}>
                                <i className="fa fa-times"></i>
                            </a>
                        </td>
                    </tr>
                );
            });
            let containsPerformers = song.performers.length > 0;
            return (
                <Panel 
                    key={`${song.name}-${song.number}`}
                    header={`${song.number}. ${song.name} (${song.length})`}
                    eventKey={idx + 1}
                    bsStyle={containsPerformers ? 'default' : 'danger'}>
                    <div className="add-performer pull-right">
                        <button onClick={() => this.openAddPerformerModal(song.number)} className="btn btn-default">Bæta við flytjanda <i className="fa fa-fw fa-plus"></i></button>
                    </div>
                    <table className={'table table-striped table-responsive' + (containsPerformers ? '' : ' hidden')}>
                        <thead>
                            <tr>
                                <th>Nafn</th>
                                <th>Hljóðfæri</th>
                                <th>Hlutverk</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayPerformers}
                        </tbody>
                    </table>
                    <h5 className={containsPerformers ? 'hidden' : ''}><br /><br />Það er enginn flytjandi skráður á lagið.</h5>
                </Panel>
            );
        });
    }
    render() {
        return (
            <div>
                <PanelGroup defaultActiveKey="1" accordion>
                    {this.renderSongs()}
                </PanelGroup>
                <PerformerListModal 
                    isOpen={this.state.addPerformerModalIsOpen} 
                    update={(performer) => this.addPerformer(performer, this.state.selectedSong)}
                    close={() => this.setState({ addPerformerModalIsOpen: false })} />
            </div>
        );
    }
}

SongWithMusiciansAccordion.propTypes = {
    songs: PropTypes.array.isRequired,
    updateState: PropTypes.func.isRequired
};

export default SongWithMusiciansAccordion;