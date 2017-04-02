import React from 'react';
import ModalSteps from '../common/modalSteps';
import SortableTable from '../common/sortableTable';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { toastr } from 'react-redux-toastr';
import { padIsrcNumber } from '../../helpers/isrcHelper';
import _ from 'lodash';

export default class AddSong extends React.Component {
    componentWillReceiveProps(newProps) {
        if (!newProps.isVisible) {
            this.setState({
                currentSongName: '',
                currentSongLength: '',
                currentFullSongLength: moment(new Date(2017, 1, 1, 0, 0, 0, 0)),
                currentSongIsrc: ''
            });
        }
    }
    constructor() {
        super();

        this.state = {
            songs: [],
            lastSongNumber: 0,
            currentSongName: '',
            currentSongLength: '',
            currentFullSongLength: moment(new Date(2017, 1, 1, 0, 0, 0, 0)),
            currentSongIsrc: ''
        };
    }
    addSongToList(e) {
        e.preventDefault();
        const { songs, lastSongNumber, currentSongName, currentSongLength, currentSongIsrc } = this.state;
        let newSongList = _.concat(songs, { 
            number: lastSongNumber + 1, 
            name: currentSongName,
            length: currentSongLength,
            isrc: `${this.props.isrcPrefix}${currentSongIsrc}`,
            performers: []
        });
        this.setState({
            currentSongName: '',
            currentSongLength: '',
            currentFullSongLength: moment(new Date(2017, 1, 1, 0, 0, 0, 0)),
            currentSongIsrc: '',
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
            song.isrc = `${this.props.isrcPrefix}${padIsrcNumber(parseInt(this.props.lastUsedIsrc) + (idx + 1))}`;
        });

        this.setState({
            songs: newSongs
        });
    }
    addSongLength(value) {
        if (moment(value).isValid()) {
            this.setState({
                currentSongLength: moment(value).format('H:mm:ss'),
                currentFullSongLength: moment(value)
            });
        }
    }
    getNextIsrcNumber(e) {
        e.preventDefault();
        let nextIsrc = this.props.lastUsedIsrc;

        this.setState({
            currentSongIsrc: padIsrcNumber(parseInt(nextIsrc) + (this.state.songs.length + 1))
        });
    }
    render() {
        return (
            <div className={this.props.isVisible ? 'songs' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={3} />
                <h4>Skrá lög</h4>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="song-name">Nafn lags:</label>
                        <input 
                            tabIndex="1"
                            name="song-name"
                            id="song-name"
                            autoFocus={true}
                            type="text" 
                            placeholder="Skráðu inn nafn lags.." 
                            className="form-control" 
                            value={this.state.currentSongName}
                            onChange={(e) => this.setState({ currentSongName: e.target.value })} />
                    </div>
                    <div className="form-group row">
                        <div className="col-xs-12">
                            <label htmlFor="">Lengd lags:</label>
                            <TimePicker
                                showSecond={true}
                                value={this.state.currentFullSongLength}
                                defaultValue={moment(new Date(2017, 1, 1, 0, 0, 0, 0))}
                                onChange={this.addSongLength.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group isrc-wrapper">
                        <div className="row">
                            <div className="col-xs-12">
                                <label htmlFor="song-isrc">ISRC-númer:</label>
                            </div>
                        </div>
                        <div className="col-xs-2 isrc-series">
                            <div className="isrc-prefix">{this.props.isrcPrefix}</div>
                        </div>
                        <div className="col-xs-9 isrc-series">
                            <input 
                                tabIndex="3"
                                id="song-isrc"
                                name="song-isrc"
                                value={this.state.currentSongIsrc}
                                type="text"
                                className="form-control no-border-radius"
                                onChange={(e) => this.setState({ currentSongIsrc: e.target.value })} />
                        </div>
                        <div className="col-xs-1 isrc-series">
                            <button 
                                onClick={(e) => this.getNextIsrcNumber(e)} 
                                className="btn btn-default no-border-radius" 
                                style={{width: '100%'}}
                                tabIndex="4">
                                <i className="fa fa-refresh"></i>
                            </button>
                        </div>
                    </div>
                    <div className="form-group text-right">
                        <button 
                            tabIndex="5"
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
                        tabIndex={this.state.songs.length + 7}
                        className="btn btn-default"
                        onClick={() => this.props.back()}>Til baka</button>
                    <button
                        tabIndex={this.state.songs.length + 8}
                        disabled={this.state.songs.length === 0}
                        className="btn btn-default btn-primary" 
                        onClick={() => this.props.next(this.state.songs)}>Áfram
                    </button>
                </div>
            </div>
        );
    }
}