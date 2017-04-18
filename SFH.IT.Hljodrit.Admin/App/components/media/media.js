import React from 'react';
import { connect } from 'react-redux';
import { getMediaRecordingsByCriteria, hasStoppedFetchingSongs } from '../../actions/songActions';
import Table from '../common/table';
import mediaTableData from './mediaTableData';
import Spinner from 'react-spinner';
import PageSelector from '../common/pageSelector';
import Paging from '../common/paging';


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
        }
    }

    changePageSize(newPageSize) {
        this.setState({
            pageSize: newPageSize
        }, function() {
            props.getMediaRecordingsByCriteria(state.pageSize,
                state.page,
                state.songSearchTerm,
                state.selectSongFilter);
        });
    }

    changePageNumber(newPageNumber) {
        var thiss = this;
        this.setState({
            page: newPageNumber
        }, function() {
            thiss.props.getMediaRecordingsByCriteria(thiss.state.pageSize,
                thiss.state.page,
                thiss.state.songSearchTerm,
                thiss.state.selectSongFilter);
        });
    }

    renderMediaTable() {
        if (!this.props.isFetching) {
            return (
                <div>
                    <PageSelector visible={!this.props.isFetching}
                                  change={newPageSize => this.changePageSize(newPageSize)} />
                    <Table tableData={mediaTableData} objects={this.props.mediaEnvelope.objects} />
                    <Paging visible={!this.props.isFetching}
                            currentPage={this.props.currentPage}
                            maximumPage={this.props.maximumPage}
                            changePage={newPageNumber => this.changePageNumber(newPageNumber)} />
                </div>
            )
        }
    }

    getNewSongs(e) {
        if (e.keyCode === 13) {
            this.props.getMediaRecordingsByCriteria(this.state.pageSize,
                this.state.page,
                this.state.songSearchTerm,
                this.state.selectSongFilter);
        }
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
                <Spinner className={this.props.isFetching ? '' : 'hidden'} />
                { this.renderMediaTable() }
            </div>
        );
    }
}

function mapStateToProps(state) {
    debugger;
    return {
        isFetching: state.songs.isFetching,
        mediaEnvelope: state.songs.mediaRecordingEnvelope,
        currentPage: state.songs.mediaRecordingEnvelope.currentPage,
        maximumPage: state.songs.mediaRecordingEnvelope.maximumPage
    }
}

export default connect(mapStateToProps, { getMediaRecordingsByCriteria, hasStoppedFetchingSongs }) (Media);