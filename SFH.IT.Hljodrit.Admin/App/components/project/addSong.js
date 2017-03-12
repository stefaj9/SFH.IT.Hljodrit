import React from 'react';
import ModalSteps from '../common/modalSteps';
import SortableTable from '../common/sortableTable';
import { toastr } from 'react-redux-toastr';
import _ from 'lodash';

export default class AddSong extends React.Component {
    constructor() {
        super();

        this.state = {
            songs: [],
            lastSongNumber: 0,
            currentSongName: '',
            currentSongLength: ''
        };
    }
    addSongToList(e) {
        e.preventDefault();
        const { songs, lastSongNumber, currentSongName, currentSongLength } = this.state;
        let newSongList = _.concat(songs, { 
            number: lastSongNumber + 1, 
            name: currentSongName,
            length: currentSongLength,
            isrc: '-',
            performers: []
        });
        this.setState({
            currentSongName: '',
            currentSongLength: '',
            lastSongNumber: lastSongNumber + 1,
            songs: newSongList
        });
        toastr.success('Tókst!', 'Tókst að bæta við lagi');
    }
    removeSongFromList(e, songNumber) {
        e.preventDefault();
        const { songs, lastSongNumber } = this.state;
        let newSongList = _.cloneDeep(songs);
        _.remove(newSongList, (item) => {
            return item.number === songNumber;
        });
        newSongList = _.forEach(newSongList, (song, idx) => {
            song.number = idx + 1;
        });
        this.setState({
            lastSongNumber: lastSongNumber - 1,
            songs: newSongList
        });
        toastr.success('Tókst!', 'Tókst að fjarlægja lag');
    }
    isAddSongValid() {
        const { currentSongName, currentSongLength } = this.state;
        return currentSongName.length > 0 && currentSongLength.length > 0;
    }
    sortTable(songs) {
        let consistantCopy = _.cloneDeep(this.state.songs);
        let newSongs = _.cloneDeep(this.state.songs);

        _.forEach(songs, (item, idx) => {
            let number = parseInt(item);
            // Order the songs in the order which is given in the new songs order
            let songToChange = _.find(consistantCopy, (song) => {
                return song.number === number;
            });
            newSongs[idx] = songToChange;
        });

        newSongs = _.forEach(newSongs, (song, idx) => {
            song.number = idx + 1;
        });

        this.setState({
            songs: newSongs
        });
    }
    render() {
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={2} />
                <h4>Skrá lög</h4>
                <form action="">
                    <div className="form-group">
                        <input 
                            autoFocus={true}
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
                        <button 
                            className="btn btn-default" 
                            onClick={(e) => this.addSongToList(e)}
                            disabled={!this.isAddSongValid()}>Bæta við</button>
                    </div>
                </form>
                <SortableTable
                    visible={this.state.songs.length !== 0}
                    items={this.state.songs}
                    remove={(e, item) => this.removeSongFromList(e, item)}
                    onChange={(songs) => this.sortTable(songs)}
                    headers={['', 'Númer', 'Nafn', 'Lengd', 'ISRC', '']} />
                <p className={this.state.songs.length === 0 ? '' : 'hidden'}>Engin lög hafa verið skráð á þetta verkefni.</p>
                <div className="btn-group pull-right">
                    <button 
                        className="btn btn-default"
                        onClick={() => this.props.back()}>Til baka</button>
                    <button
                        disabled={this.state.songs.length === 0}
                        className="btn btn-default btn-primary" 
                        onClick={() => this.props.next(this.state.songs)}>Áfram
                    </button>
                </div>
            </div>
        );
    }
}