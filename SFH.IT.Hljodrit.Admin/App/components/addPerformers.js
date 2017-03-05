import React from 'react';
import ModalSteps from './modalSteps';
import { PanelGroup, Panel } from 'react-bootstrap';
import PerformerListModal from './performerListModal';
import { toastr } from 'react-redux-toastr';
import _ from 'lodash';

export default class AddPerformers extends React.Component {
    componentWillReceiveProps(newProps) {
        this.setState({
            songs: newProps.songs
        });
    }
    constructor() {
        super();

        this.state = {
            addPerformerModalIsOpen: false,
            selectedSong: -1,
            songs: []
        };
    }
    renderSongs() {
        return this.state.songs.map((song, idx) => {
            let displayPerformers = song.performers.map((performer) => {
                let instruments = performer.instruments.map((instrument) => {
                    return (
                        <div>{instrument.name}</div>
                    );
                });
                return (
                    <tr key={`${song.number}-${performer.id}-${performer.role}`}>
                        <td>{performer.name}</td>
                        <td>{instruments}</td>
                        <td>{performer.role}</td>
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
                    <p className={containsPerformers ? 'hidden' : ''}><br /><br />Gerð er krafa um að a.m.k. einn flytjandi er skráður á lagið.</p>
                </Panel>
            );
        });
    }
    openAddPerformerModal(songId) {
        this.setState({
            addPerformerModalIsOpen: true,
            selectedSong: songId
        });
    }
    addPerformer(performer, number) {
        const { songs } = this.state;
        let songsCopy = _.cloneDeep(songs);
        let song = _.find(songsCopy, (item) => {
            return item.number === number;
        });

        if (_.find(song.performers, (p) => { return p.id === performer.Id })) {
            toastr.error('Villa!', 'Ekki er hægt að bæta við sama flytjanda oftar en einu sinni');
            return;
        }

        if (song) {
            // The song has already been added
            song.performers = _.concat(song.performers, { id: performer.Id, name: performer.Fullname, instruments: [], role: '' });
        } else {
            songsCopy = _.concat(songsCopy, {
                number: number,
                name: song.name,
                length: song.length,
                isrc: song.isrc,
                performers: [ { id: performer.Id, name: performer.Fullname, instruments: [], role: '' } ]
            });
        }

        this.setState({
            songs: songsCopy,
            addPerformerModalIsOpen: false
        });

        toastr.success('Tókst!', 'Það tókst að bæta við flytjanda á lagið');
    }
    removePerformerFromSong(e, number, performerId) {
        e.preventDefault();
        let allSongs = _.cloneDeep(this.state.songs);
        let song = _.find(allSongs, (item) => {
            return item.number === number;
        });

        _.remove(song.performers, (performer) => {
            return performer.id === performerId;
        });

        this.setState({
            songs: allSongs
        });

        toastr.success('Tókst!', 'Það tókst að fjarlægja flytjanda af laginu');
    }
    canBeSubmitted() {
        return this.state.songs.length > 0 && _.every(this.state.songs, (song) => {
            return song.performers.length > 0;
        });
    }
    render() {
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={3} />
                <h4>Skrá flytjendur</h4>
                <div className="song-wrapper">
                    <p>Gerð er krafa um að það sé að lágmarki einn flytjandi skráður á hvert lag. Lög hér að neðanverðu eru röðuð eftir númer lags á verkefninu.</p>
                    <PanelGroup defaultActiveKey="1" accordion>
                        {this.renderSongs()}
                    </PanelGroup>
                </div>
                <div className="btn-group pull-right">
                    <button 
                        className="btn btn-default"
                        onClick={() => this.props.back()}>Til baka</button>
                    <button 
                        disabled={!this.canBeSubmitted()}
                        className="btn btn-default btn-primary" 
                        onClick={() => this.props.next(this.state.songs)}>Áfram
                    </button>
                </div>
                <PerformerListModal 
                    isOpen={this.state.addPerformerModalIsOpen} 
                    update={(performer) => this.addPerformer(performer, this.state.selectedSong)}
                    close={() => this.setState({ addPerformerModalIsOpen: false })} />
            </div>
        );
    }
}