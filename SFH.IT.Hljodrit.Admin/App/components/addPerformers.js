import React from 'react';
import ModalSteps from './modalSteps';
import { PanelGroup, Panel } from 'react-bootstrap';
import PeopleListModal from './peopleListModal';
import _ from 'lodash';

export default class AddPerformers extends React.Component {
    constructor() {
        super();

        this.state = {
            addPerformerModalIsOpen: false,
            selectedSong: -1,
            allPerformers: []
        };
    }
    renderSongs() {
        return this.props.songs.map((song, idx) => {
            let displayPerformers = song.performers.map((performer, idx) => {
                return (
                    <tr key={`${song.number}-${performer.name}-${performer.role}`}>
                        <td>{performer.name}</td>
                        <td>{performer.instrument}</td>
                        <td>{performer.role}</td>
                        <td>
                            <a href="#" onClick={(e) => this.removePerformerFromSong(e, song.number, idx)}>
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
    addPerformer(performer, songId) {
        const { allPerformers } = this.state;
        let allPerformersCopy = _.cloneDeep(allPerformers);
        let song = _.find(allPerformersCopy, (item) => {
            return item.songId === songId;
        });

        song.performers = _.concat(song.performers, performer);

        this.setState({
            allPerformers: allPerformersCopy,
            addPerformerModalIsOpen: false
        });
    }
    removePerformerFromSong(e, songId, performerNumber) {
        e.preventDefault();
        let allSongs = _.cloneDeep(this.state.allPerformers);
        let song = _.find(allSongs, (item) => {
            return item.songId === songId;
        });

        _.remove(song.performers, (performer, idx) => {
            return idx === performerNumber;
        });

        this.setState({
            allPerformers: allSongs
        });
    }
    canBeSubmitted() {
        return this.state.allPerformers.length > 0 && _.every(this.state.allPerformers, (song) => {
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
                        onClick={() => this.props.next(this.state.allPerformers)}>Áfram
                    </button>
                </div>
                <PeopleListModal 
                    isOpen={this.state.addPerformerModalIsOpen} 
                    update={(performer) => this.addPerformer(performer, this.state.selectedSong)}
                    close={() => this.setState({ addPerformerModalIsOpen: false })}
                    title="Bæta við flytjanda" />
            </div>
        );
    }
}