import React from 'react';
import Steps from '../../common/steps';
import PerformerGroup from './performerGroup';
import SongWithMusiciansAccordion from '../../common/songWithMusiciansAccordion';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';

export default class AddPerformers extends React.Component {
    componentWillReceiveProps(newProps) {
        this.setState({
            songs: newProps.songs
        });
    }
    constructor() {
        super();
        this.state = {
            songs: []
        };
    }
    canBeSubmitted() {
        return this.state.songs.length > 0 && _.every(this.state.songs, (song) => {
            return song.performers.length > 0;
        });
    }
    addGroupToSongs(group, songNumbers) {
        let songs = _.cloneDeep(this.state.songs);
        let containsError = false;
        songNumbers.map((number) => {
            let song = _.find(songs, (song) => { return song.number === number });
            group.map((g) => {
                song.performers = _.concat(song.performers, g);
            });
        });
        if (!containsError) {
            toastr.success('Tókst!', 'Það tókst að bæta við hópi á valin lög.');
            this.setState({ songs: songs });
        }
    }
    render() {
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <Steps steps={this.props.steps} currentStep={4} />
                <h4>Skrá flytjendur</h4>
                <div className="row">
                    <div className="col-xs-4 performer-group-wrapper">
                        <PerformerGroup
                            songs={this.state.songs}
                            transfer={this.addGroupToSongs.bind(this)} />
                    </div>
                    <div className="song-wrapper col-xs-8">
                        <p>Gerð er krafa um að það sé að lágmarki einn flytjandi skráður á hvert lag. Lög hér að neðanverðu eru röðuð eftir númer lags á verkefninu.</p>
                        <SongWithMusiciansAccordion
                            songs={this.state.songs}
                            updateState={(newState) => this.setState(newState)}
                            functionDisabled={false} />
                    </div>
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
            </div>
        );
    }
}