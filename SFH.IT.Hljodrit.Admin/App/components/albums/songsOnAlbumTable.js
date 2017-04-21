import React from 'react';
import { connect } from 'react-redux';
import Table from '../common/table';
import { removeSongsFromAlbum } from '../../actions/AlbumsActions';
import albumTableData from './albumTableData';
import _ from 'lodash';

class SongsOnAlbumTable extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedSongsForDeletion: [],
            bootstrapTableRef: null
        };
    }

    addToListOfSelectedSongs(songs, status) {
        let selectedSongs = _.cloneDeep(this.state.selectedSongsForDeletion);
        if (!status) {
            _.forEach(songs, (song) => {
                _.remove(selectedSongs, (s) => { return s === song.songId });
            });
        } else {
            selectedSongs = _.concat(selectedSongs, songs.map((s) => { return s.songId }));
        }
        this.setState({
            selectedSongsForDeletion: selectedSongs
        });
    }

    removeSongsFromAlbum() {
        this.addToListOfSelectedSongs(this.state.selectedSongsForDeletion, false);
        this.props.removeSongsFromAlbum(this.props.albumId, this.state.selectedSongsForDeletion);
        this.setState({ selectedSongsForDeletion: [] });
        this.state.bootstrapTableRef.reset();
    }


    render() {
        return (
            <div className="row">
                <Table
                    selectRow={true}
                    selectRowMode="checkbox"
                    onClickCallback={this.props.callback}
                    isRemote={false}
                    pagination={false}
                    tableData={albumTableData}
                    refCallback={(ref) => { if (this.state.bootstrapTableRef === null && ref !== null) { this.setState({ bootstrapTableRef: ref }); } }}
                    tableRowClassName="album-song-selection-row"
                    selectRowCallback={(row, status) => this.addToListOfSelectedSongs([row], status)}
                    selectRowCallBackAll={(status, rows) => this.addToListOfSelectedSongs(rows, status)}
                    objects={this.props.songs}
                />
                <div className="col-xs-12 text-right">
                    <div className="btn-group">
                        <button className="btn btn-default btn-primary"
                            disabled={!this.state.selectedSongsForDeletion.length > 0}
                            onClick={() => this.removeSongsFromAlbum() }>
                            <i className="fa fa-times"></i> Eyða völdum lögum
                        </button>
                        <button
                            className="btn btn-default btn-primary">
                            <i className="fa fa-plus"></i> Bæta við lögum
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

SongsOnAlbumTable.propTypes = {
    songs: React.PropTypes.array.isRequired
};

export default connect(null, { removeSongsFromAlbum })(SongsOnAlbumTable);
