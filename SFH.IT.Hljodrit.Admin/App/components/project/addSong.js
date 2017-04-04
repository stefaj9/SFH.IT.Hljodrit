import React from 'react';
import { connect } from 'react-redux';
import { getSongsByCriteria } from '../../actions/songActions';
import ModalSteps from '../common/modalSteps';
import SortableTable from '../common/sortableTable';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { toastr } from 'react-redux-toastr';
import { padIsrcNumber } from '../../helpers/isrcHelper';
import { Tabs, Tab } from 'react-bootstrap';
import Spinner from 'react-spinner';
import _ from 'lodash';

class AddSong extends React.Component {
    componentWillMount() {
        this.props.getSongsByCriteria(25, 1, '');
    }
    componentWillReceiveProps(newProps) {
        if (!newProps.isVisible) {
            this.setState({
                currentSongName: '',
                currentSongLength: '',
                currentFullSongLength: moment(new Date(2017, 1, 1, 0, 0, 0, 0)),
                currentSongIsrc: '',
                songSearchTerm: '',
                selectedTab: 1
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
            currentSongIsrc: '',
            songSearchTerm: '',
            selectedTab: 1
        };
    }
    selectSongAndAdd(e, song) {
        this.setState({ 
            currentSongName: song.songTitle, 
            currentSongLength: song.duration,
            currentSongIsrc: song.isrc }, this.addSongToList(e));
    }
    addSongToList(e) {
        e.preventDefault();
        const { songs, lastSongNumber, currentSongName, currentSongLength, currentSongIsrc } = this.state;
        let newSongList = _.concat(songs, { 
            number: lastSongNumber + 1, 
            name: currentSongName,
            length: currentSongLength,
            isrc: `${this.props.isrcPrefix}${_.padStart(currentSongIsrc, 5, '0')}`,
            performers: []
        });
        this.setState({
            currentSongName: '',
            currentSongLength: '',
            currentFullSongLength: moment(new Date(2017, 1, 1, 0, 0, 0, 0)),
            currentSongIsrc: '',
            lastSongNumber: lastSongNumber + 1,
            songSearchTerm: '',
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
        return currentSongName && currentSongName.length > 0 && currentSongLength && currentSongLength.length > 0;
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
    renderSongSuggestions() {
        if (!this.props.songs.isFetchingSongs) {
            return this.props.songs.map((song) => {
                return (
                    <div className="well row" key={song.songId}>
                        <div className="col-xs-11 song-select-info">
                            <div className="row">
                                <div className="col-xs-6 text-left">{song.songTitle}</div>
                                <div className="col-xs-6 text-right">{song.mainArtist}</div>
                            </div>
                            <div className="row">
                                <div className="col-xs-6 text-left">{song.releaseDate}</div>
                                <div className="col-xs-6 text-right">{song.duration}</div>
                            </div>
                        </div>
                        <div 
                            className="col-xs-1 text-center add-song-plus"
                            onClick={(e) => this.selectSongAndAdd(e, song)}>
                            <i className="fa fa-plus fa-2x"></i>
                        </div>
                    </div>
                );
            });
        }
    }
    addSongLength(value) {
        if (moment(value).isValid()) {
            this.setState({
                currentSongLength: moment(value).format('HH:mm:ss'),
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
    getNewSongs(e) {
        if (e.keyCode === 13) {
            this.props.getSongsByCriteria(25, 1, e.target.value);
        }
    }
    render() {
        return (
            <div className={this.props.isVisible ? 'songs' : 'hidden'}>
                <ModalSteps steps={this.props.steps} currentStep={3} />
                <h4>Skrá lög</h4>
                <Tabs 
                    id="add-song-tabs"
                    activeKey={this.state.selectedTab} 
                    onSelect={(key) => this.setState({ selectedTab: key })}>
                    <Tab eventKey={1} title="Nýskrá">
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
                                        tabIndex="4"
                                        title="Sækja næsta lausa ISRC-númer">
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
                    </Tab>
                    <Tab eventKey={2} title="Leita">
                        <div className="row song-search-bar">
                            <div className="col-xs-8 no-padding">
                                <input 
                                    onKeyDown={(e) => this.getNewSongs(e)}
                                    onChange={(e) => this.setState({ songSearchTerm: e.target.value })}
                                    value={this.state.songSearchTerm}
                                    type="text" 
                                    placeholder="Leita.." 
                                    className="form-control no-border-radius" />
                            </div>
                            <div className="col-xs-4 no-padding">
                                <select name="song-search-by" id="song-search-by" className="form-control no-border-radius">
                                    <option value="name">Nafn lags</option>
                                    <option value="mainArtist">Aðalflytjandi</option>
                                    <option value="publishYear">Útgáfuár</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            {this.renderSongSuggestions()}
                            <Spinner className={this.props.isFetchingSongs ? '' : 'hidden'} />
                        </div>
                    </Tab>
                </Tabs>
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

function mapStateToProps(state) {
    return {
        songs: state.songs.songEnvelope.objects,
        isFetchingSongs: state.songs.isFetching
    };
};

export default connect(mapStateToProps, { getSongsByCriteria })(AddSong);