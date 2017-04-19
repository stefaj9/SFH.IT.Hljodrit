import React from 'react';
import { connect } from 'react-redux';
import { getMediaRecordingsByCriteria, hasStoppedFetchingSongs } from '../../actions/songActions';
import MediaTable from './mediaTable';

class Media extends React.Component {

    componentWillMount() {
        this.props.hasStoppedFetchingSongs();
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 1,
            pageSize: 25,
            songSearchTerm: '',
            selectSongFilter: 'name',
        };

        this.changePageSize = this.changePageSize.bind(this);
        this.changePageNumber = this.changePageNumber.bind(this);
    }

    changePageSize(newPageSize) {
        this.setState({
            pageSize: newPageSize
        });
    }

    changePageNumber(newPageNumber) {
        let thiss = this;
        this.setState({
            page: newPageNumber
        }, function() {
            thiss.props.getMediaRecordingsByCriteria(thiss.state.pageSize,
                thiss.state.page,
                thiss.state.songSearchTerm,
                thiss.state.selectSongFilter);
        });
    }

    getNewSongs(e) {
        if (this.hitReturn(e.keyCode)) {
            this.props.getMediaRecordingsByCriteria(this.state.pageSize,
                this.state.page,
                this.state.songSearchTerm,
                this.state.selectSongFilter);
        }
    }

    hitReturn(code) {
        return code === 13;
    }

    render() {
        return (
            <div>
                <h1>Hljóðrit</h1>
                <div className="row song-search-bar">
                    <div className="col-xs-8">
                        <input
                            onKeyDown={(e) => this.getNewSongs(e)}
                            onChange={(e) => this.setState({ songSearchTerm: e.target.value })}
                            value={this.state.songSearchTerm}
                            type="text"
                            placeholder="Leita.."
                            className="form-control no-border-radius" />
                    </div>
                    <div className="col-xs-4">
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
                <MediaTable isFetching={this.props.isFetching}
                            objects={this.props.mediaEnvelope.objects}
                            currentPage={this.props.currentPage}
                            maximumPage={this.props.maximumPage}
                            changePageSize={this.changePageSize}
                            changePageNumber={this.changePageNumber} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.songs.isFetching,
        mediaEnvelope: state.songs.mediaRecordingEnvelope,
        currentPage: state.songs.mediaRecordingEnvelope.currentPage,
        maximumPage: state.songs.mediaRecordingEnvelope.maximumPage
    }
}

export default connect(mapStateToProps, { getMediaRecordingsByCriteria, hasStoppedFetchingSongs }) (Media);