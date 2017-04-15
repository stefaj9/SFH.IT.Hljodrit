import React from 'react';
import Table from '../common/table';
import albumTableData from './albumTableData';

const SongsOnAlbumTable = ({songs, callback, removeSongsFromAlbum, addToListOfSelectedSongs, isRemoveButtonActive}) => {
    return (
        <div className="row">
            <Table
                selectRow={true}
                selectRowMode="checkbox"
                onClickCallback={callback}
                tableData={albumTableData}
                refCallback={(ref) => { return ref; }}
                tableRowClassName="album-song-selection-row"
                selectRowCallback={(row, status) => addToListOfSelectedSongs([row], status)}
                selectRowCallBackAll={(status, rows) => addToListOfSelectedSongs(rows, status)}
                objects={songs}
            />
            <div className="col-xs-12 text-right">
                <div className="btn-group">
                    <button className="btn btn-default btn-primary"
                        disabled={!isRemoveButtonActive}
                        onClick={() => removeSongsFromAlbum()}>
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

SongsOnAlbumTable.propTypes = {
    songs: React.PropTypes.array.isRequired,
    removeSongsFromAlbum: React.PropTypes.func.isRequired,
    addToListOfSelectedSongs: React.PropTypes.func.isRequired,
    isRemoveButtonActive: React.PropTypes.bool.isRequired
};


export default SongsOnAlbumTable;
