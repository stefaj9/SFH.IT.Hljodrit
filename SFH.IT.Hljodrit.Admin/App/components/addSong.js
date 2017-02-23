import React from 'react';
import ModalSteps from './modalSteps';
import _ from 'lodash';

export default class AddSong extends React.Component {
    constructor() {
        super();

        this.state = {
            songs: [
                {number: 1, name: 'Rylan', length: '5:43', isrc: '-'},
                {number: 2, name: 'Magic', length: '5:43', isrc: '-'},
                {number: 3, name: 'Majestic', length: '5:43', isrc: '-'}
            ],
            lastSongNumber: 3,
            currentSongName: '',
            currentSongLength: ''
        };
    }
    addSongToList() {
        const { songs, lastSongNumber, currentSongName, currentSongLength } = this.state;
        let newSongList = _.concat(songs, { 
            number: lastSongNumber + 1, 
            name: currentSongName,
            length: currentSongLength,
            isrc: '-'
        });
        this.setState({
            currentSongName: '',
            currentSongLength: '',
            lastSongNumber: lastSongNumber + 1,
            songs: newSongList
        });
    }
    renderSongs() {
        return this.state.songs.map((song) => {
            return (
                <tr key={`${song.number}-${song.name}`}>
                    <td>{song.number}</td>
                    <td>{song.name}</td>
                    <td>{song.length}</td>
                    <td>{song.isrc}</td>
                </tr>
            );
        });
    }
    render() {
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={2} />
                <h4>Skrá lög</h4>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Skráðu inn nafn lags.." 
                        className="form-control" 
                        value={this.state.currentSongName}
                        onChange={(e) => this.setState({ currentSongName: e.target.value })} />
                </div>
                <div className="form-group">
                    <input 
                        type="text"
                        placeholder="Lengd lags.."
                        className="form-control"
                        value={this.state.currentSongLength}
                        onChange={(e) => this.setState({ currentSongLength: e.target.value })} />
                </div>
                <div className="form-group text-right">
                    <button className="btn btn-default" onClick={() => this.addSongToList()}>Bæta við</button>
                </div>
                <table className="table table-striped table-responsive">
                    <thead>
                        <tr>
                            <th>Nr.</th>
                            <th>Nafn</th>
                            <th>Lengd</th>
                            <th>ISRC</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderSongs()}</tbody>
                    <tfoot></tfoot>
                </table>
                <div className="btn-group pull-right">
                    <button 
                        className="btn btn-default"
                        onClick={() => this.props.back()}>Til baka</button>
                    <button 
                        className="btn btn-default btn-primary" 
                        onClick={() => this.props.next(this.state.songs)}>Áfram
                    </button>
                </div>
            </div>
        );
    }
}