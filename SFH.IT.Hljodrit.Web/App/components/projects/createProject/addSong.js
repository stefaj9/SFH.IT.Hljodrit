import React from 'react';
import Steps from '../../common/steps';
import AddSongInput from './addSongInput';

export default class AddSong extends React.Component {
    constructor() {
        super();
        this.state = {
            songs: []
        };
    }
    render() {
        return (
            <div className={this.props.isVisible ? 'songs' : 'hidden'}>
                <Steps steps={this.props.steps} currentStep={3} />
                <h4>Skrá lög</h4>
                <AddSongInput
                    update={(songs) => this.setState({ songs: songs })}
                    songs={this.state.songs} />
                <div className="btn-group pull-right">
                    <button 
                        tabIndex={this.state.songs.length + 7}
                        className="btn btn-default"
                        onClick={() => { window.scrollTo(0, 0); this.props.back(); }}>Til baka
                    </button>
                    <button
                        tabIndex={this.state.songs.length + 8}
                        disabled={this.state.songs.length === 0}
                        className="btn btn-default btn-primary" 
                        onClick={() => { window.scrollTo(0, 0); this.props.next(this.state.songs); }} >Áfram
                    </button>
                </div>
            </div>
        );
    }
}