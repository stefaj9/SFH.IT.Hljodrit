import React from 'react';
import { connect } from 'react-redux';
import { getSongDetailsById } from '../../actions/songActions';
import Spinner from 'react-spinner';
import _ from 'lodash';
import moment from 'moment';
import { DateField, DatePicker } from 'react-date-picker'
import TimePicker from 'rc-time-picker';

class SongDetails extends React.Component {
    componentWillReceiveProps(newProps) {
        if (_.keys(newProps.song).length > 0 && !this.state.hasFetched) {
            let song = _.cloneDeep(newProps.song);
            let durationSplit = newProps.song.duration.split(':');
            song.duration = moment('2000-01-01').add(durationSplit[0], 'h').add(durationSplit[1], 'm').add(durationSplit[2], 's');
            this.setState({
                currentSong: song,
                hasFetched: true
            });
        }
    }
    componentWillMount() {
        this.props.getSongDetailsById(this.props.routeParams.songId);
        moment.locale('is');
    }
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentSong: {},
            hasFetched: false,
            dirtyForm: false
        };
    }
    renderFormGroup(label, id, value, onChangeFunc) {
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <input onChange={onChangeFunc.bind(this)} type="text" className="form-control" id={id} name={id} value={value} />
            </div>
        );
    }
    renderSongLengthPicker() {
        return (
            <div className="form-group">
                <label htmlFor="">Lengd lags</label>
                <TimePicker
                    showSecond={true}
                    value={this.state.currentSong.duration}
                    defaultValue={this.state.currentSong.duration}
                    onChange={this.updateSongDuration.bind(this)} />
            </div>
        );
    }
    renderReleaseDatePicker() {
        return (
            <div className="form-group">
                <label>Útgáfudagur lags</label>
                <div>
                    <DateField
                        dateFormat="DD.MM.YYYY"
                        forceValidDate={true}
                        updateOnDateClick={true}
                        defaultValue={moment(this.props.song.releaseDate).format('DD.MM.YYYY')}>
                        <DatePicker
                            navigation={true}
                            locale="is"
                            forceValidDate={true}
                            highlightWeekends={true}
                            highlightToday={true}
                            weekNumbers={true}
                            weekStartDay={1}
                            onChange={this.updateSongReleaseDate.bind(this)} />
                    </DateField>
                </div>
            </div>
        );
    }
    updateSongTitle(e) {
        let song = _.cloneDeep(this.state.currentSong);
        song.songTitle = e.target.value;
        this.setState({ currentSong: song, dirtyForm: true });
    }
    updateSongIsrc(e) {
        let song = _.cloneDeep(this.state.currentSong);
        song.isrc = e.target.value;
        this.setState({ currentSong: song, dirtyForm: true });
    }
    updateSongDuration(value) {
        if (moment(value).isValid()) {
            let song = _.cloneDeep(this.state.currentSong);
            song.duration = value;
            this.setState({ currentSong: song, dirtyForm: true });
        }
    }
    updateSongReleaseDate(dateString, momentObj) {
        let song = _.cloneDeep(this.state.currentSong);
        song.releaseDate = momentObj.dateMoment._d;
        this.setState({ currentSong: song, dirtyForm: true });
    }
    renderSongInfo() {
        if (!this.props.isFetching) {
            return (
                <div>
                    <h2>{this.props.song.songTitle}</h2>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            {this.renderFormGroup('Titill lags', 'song-title', this.state.currentSong.songTitle, this.updateSongTitle)}
                            {this.renderFormGroup('ISRC kóði', 'song-isrc', this.state.currentSong.isrc, this.updateSongIsrc)}
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            {this.renderSongLengthPicker()}
                            {this.renderReleaseDatePicker()}
                        </div>
                        <div className="col-xs-12 text-right">
                            <button disabled={!this.state.dirtyForm} className="btn btn-default btn-primary">Vista</button>
                        </div>
                    </div>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                <Spinner className={this.props.isFetching ? '' : 'hidden'} />
                {this.renderSongInfo()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        song: state.songs.selectedSong,
        isFetching: state.songs.isFetching
    };
};

export default connect(mapStateToProps, { getSongDetailsById })(SongDetails);
