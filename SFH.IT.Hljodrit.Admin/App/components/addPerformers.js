import React from 'react';
import ModalSteps from './modalSteps';

export default class AddPerformers extends React.Component {
    renderSongs() {
        return this.props.songs.map((song) => {
            return (
                <div key={song.number}>
                    {song.name} - {song.number}
                </div>
            );
        });
    }
    render() {
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={3} />
                <h4>Skrá flytjendur</h4>
                <div className="song-wrapper">
                    {this.renderSongs()}
                </div>
                <div className="btn-group pull-right">
                    <button 
                        className="btn btn-default"
                        onClick={() => this.props.back()}>Til baka</button>
                    <button 
                        className="btn btn-default btn-primary" 
                        onClick={() => this.props.next()}>Áfram
                    </button>
                </div>
            </div>
        );
    }
}