import React from 'react';
import { connect } from 'react-redux';
import { getMediaRecordingsByCriteria } from '../../../actions/songActions';
import Steps from '../../common/steps';
import SortableTable from '../../common/sortableTable';
import MediaSuggestions from './mediaSuggestions';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { toastr } from 'react-redux-toastr';
import { Tabs, Tab } from 'react-bootstrap';
import _ from 'lodash';

class AddSong extends React.Component {
    componentWillMount() {
        this.props.getMediaRecordingsByCriteria(50, 1, '', 'name');
        moment.locale('is');
    }
    componentWillReceiveProps(newProps) {
        if (!newProps.isVisible) {
            this.setState({
                currentSongId: -1,
                currentSongName: '',
                currentSongLength: '',
                currentFullSongLength: moment(new Date(2017, 1, 1, 0, 0, 0, 0)),
                songSearchTerm: '',
                selectSongFilter: 'name',
                selectedTab: 1
            });
        }
    }
    constructor() {
        super();

        this.state = {
            songs: [],
            lastSongNumber: 0,
            currentSongId: -1,
            currentSongName: '',
            currentSongLength: '',
            currentFullSongLength: moment(new Date(2017, 1, 1, 0, 0, 0, 0)),
            songSearchTerm: '',
            selectSongFilter: 'name',
            selectedTab: 1
        };
    }
    addSongToList(e, songId, songName, songLength, songIsrc, recordingDate) {
        e.preventDefault();
        const { songs, lastSongNumber } = this.state;
        let newSongList = _.concat(songs, { 
            id: songId,
            number: lastSongNumber + 1,
            isrc: songIsrc,
            name: songName,
            length: songLength,
            recordingDate: recordingDate,
            performers: []
        });
        this.setState({
            currentSongId: -1,
            currentSongName: '',
            currentSongLength: '',
            currentFullSongLength: moment(new Date(2017, 1, 1, 0, 0, 0, 0)),
            lastSongNumber: lastSongNumber + 1,
            songs: newSongList
        });
        toastr.success('Tókst!', `Tókst að bæta við laginu ${songName}`);
    }
    removeSongFromList(e, songNumber) {
        e.preventDefault();
        const { songs, lastSongNumber } = this.state;
        let newSongList = _.cloneDeep(songs);
        let removeSong = _.remove(newSongList, (item) => {
            return item.number === songNumber;
        });
        newSongList = _.forEach(newSongList, (song, idx) => {
            song.number = idx + 1;
        });
        this.setState({
            lastSongNumber: lastSongNumber - 1,
            songs: newSongList
        });
        toastr.success('Tókst!', `Tókst að fjarlægja lagið ${removeSong[0].name}`);
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
        });

        this.setState({
            songs: newSongs
        });
    }
    addSongLength(value) {
        if (moment(value).isValid()) {
            this.setState({
                currentSongLength: moment(value).format('HH:mm:ss'),
                currentFullSongLength: moment(value)
            });
        }
    }
    getNewSongs(e) {
        if (e.keyCode === 13) {
            this.props.getMediaRecordingsByCriteria(50, 1, e.target.value, this.state.selectSongFilter);
        }
    }
    render() {
        return (
            <div className={this.props.isVisible ? 'songs' : 'hidden'}>
                <Steps steps={this.props.steps} currentStep={3} />
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
                            <div className="form-group text-right">
                                <button 
                                    tabIndex="5"
                                    className="btn btn-default" 
                                    onClick={(e) => this.addSongToList(e, this.state.currentSongId, this.state.currentSongName, this.state.currentSongLength, '', new Date())}
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
                                <select 
                                    name="song-search-by" 
                                    id="song-search-by" 
                                    className="form-control no-border-radius"
                                    value={this.state.selectSongFilter}
                                    onChange={(e) => this.setState({ selectSongFilter: e.target.value })}>
                                    <option value="name">Nafn lags</option>
                                    <option value="mainArtist">Aðalflytjandi</option>
                                    <option value="publishYear">Útgáfuár</option>
                                </select>
                            </div>
                        </div>
                        <MediaSuggestions
                            media={this.props.media}
                            isFetching={this.props.isFetchingSongs}
                            songs={this.state.songs}
                            addSongToList={this.addSongToList.bind(this)} />
                    </Tab>
                </Tabs>
                <SortableTable
                    visible={this.state.songs.length !== 0}
                    items={this.state.songs}
                    remove={(e, item) => this.removeSongFromList(e, item)}
                    onChange={(songs) => this.sortTable(songs)}
                    headers={['', 'Númer', 'Nafn', 'Lengd', '']} />
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
        media: state.songs.mediaRecordingEnvelope.objects,
        isFetchingSongs: state.songs.isFetching
    };
};

export default connect(mapStateToProps, { getMediaRecordingsByCriteria })(AddSong);