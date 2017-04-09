import React from 'react';
import { connect } from 'react-redux';
import { getSongDetailsById } from '../../actions/songActions';
import Spinner from 'react-spinner';
import _ from 'lodash';
import moment from 'moment';
import { DateField, DatePicker } from 'react-date-picker'

class SongDetails extends React.Component {
    componentWillReceiveProps(newProps) {
        if (_.keys(newProps.song).length > 0 && !this.state.hasFetched) {
            this.setState({
                currentSong: newProps.song
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
            hasFetched: false
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
    updateSongTitle(e) {
        let song = _.cloneDeep(this.state.currentSong);
        song.songTitle = e.target.value;
        this.setState({ currentSong: song });
    }
    updateSongIsrc(e) {
        let song = _.cloneDeep(this.state.currentSong);
        song.isrc = e.target.value;
        this.setState({ currentSong: song });
    }
    updateSongDuration(e) {
        let song = _.cloneDeep(this.state.currentSong);
        song.duration = e.target.value;
        this.setState({ currentSong: song });
    }
    updateSongReleaseDate(dateString, momentObj, config) {
        let song = _.cloneDeep(this.state.currentSong);
        console.log(momentObj.dateMoment._d);
        song.releaseDate = momentObj.dateMoment._d;
        this.setState({ currentSong: song });
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
                            {this.renderFormGroup('Lengd lags', 'song-duration', this.state.currentSong.duration, this.updateSongDuration)}
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
                        </div>
                        <div className="col-xs-12 text-right">
                            <button className="btn btn-default btn-primary">Vista</button>
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
