import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import { Tabs, Tab } from 'react-bootstrap';
import moment from 'moment';
import Spinner from 'react-spinner';
import { getMediaRecordingsByCriteria } from '../../actions/songActions';

class AddTrackToProject extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 1,
            currentSongName: '',
            currentFullSongLength: moment(new Date(2017, 1, 1, 0, 0, 0, 0)),
            currentSongLength: '',
            currentSongIsrc: '',
            songSearchTerm: '',
            selectSongFilter: ''
        };
    }
    addSongLength(value) {
        if (moment(value).isValid()) {
            this.setState({
                currentSongLength: moment(value).format('HH:mm:ss'),
                currentFullSongLength: moment(value)
            });
            const { currentSongName, currentSongIsrc } = this.state;
            this.assignAddFunction(currentSongName, moment(value).format('HH:mm:ss'), currentSongIsrc);
        }
    }
    handleInput(prop, value) {
        this.setState({
            [prop]: value
        });
        const { currentSongLength, currentSongIsrc } = this.state;
        this.assignAddFunction(value, currentSongLength, currentSongIsrc, null);
    }
    assignAddFunction(songName, songLength, songIsrc, recordingId) {
        this.props.addFunction({ 
            projectId: this.props.projectId, 
            trackName: songName,
            isrc: songIsrc,
            duration: songLength,
            trackOrder: this.props.nextSongNumber,
            recordingId: recordingId
        });
    }
    getNewSongs(e) {
        // Enter key pressed.
        if (e.keyCode === 13) {
            this.props.getMediaRecordingsByCriteria(10, 1, this.state.songSearchTerm, this.state.selectSongFilter);
        }
    }
    renderMediaSuggestions() {
        return this.props.media.map(m => {
            return (
                <div className="col-xs-12 well no-border-radius hover-cursor" onClick={() => this.assignAddFunction(m.mediaTitle, m.duration, m.isrc, m.mediaId)} key={m.mediaId}>
                    <div className="col-sm-6 col-xs-12 text-left">
                        <div className="col-xs-12">{m.mediaTitle}</div>
                        <div className="col-xs-12">{m.mainArtist}</div>
                    </div>
                    <div className="col-sm-6 col-xs-12 text-right">
                        <div className="col-xs-12">{m.duration}</div>
                        <div className="col-xs-12">{moment(m.releaseDate).format('LL')}</div>
                    </div>
                </div>
            );
        });
    }
    render() {
        return (
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
                                onChange={(e) => this.handleInput('currentSongName', e.target.value)} />
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
                    <div className="row">
                        <div className={this.props.isFetchingMedia ? 'hidden' : ''}>
                            {this.renderMediaSuggestions()}
                        </div>
                        <p className={!this.props.isFetchingMedia && this.props.media.length === 0 ? '' : 'hidden'}>Engar niðurstöður.</p>
                        <Spinner className={this.props.isFetchingMedia ? '' : 'hidden'} />
                    </div>
                </Tab>
            </Tabs>
        );
    }
};

AddTrackToProject.propTypes = {
    projectId: PropTypes.string.isRequired,
    addFunction: PropTypes.func.isRequired,
    nextSongNumber: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        media: state.songs.mediaRecordingEnvelope.objects,
        isFetchingMedia: state.songs.isFetching
    };
};

export default connect(mapStateToProps, { getMediaRecordingsByCriteria })(AddTrackToProject);
