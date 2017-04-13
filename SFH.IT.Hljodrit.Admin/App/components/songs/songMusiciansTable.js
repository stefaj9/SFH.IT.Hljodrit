import React from 'react';
import SongTableData from './songTableData';
import Table from '../common/table';

const SongMusiciansTable = ({ musicians, addMusicianToSong, addToListOfSelectedMusicians, removeMusiciansFromSong, isRemoveButtonActive }) => {
    return (
        <div className="row">
            <Table
                tableData={SongTableData}
                objects={musicians}
                selectRow={true}
                selectRowMode="checkbox"
                selectRowCallback={(row, status) => addToListOfSelectedMusicians([row], status)}
                selectRowCallBackAll={(status, rows) => addToListOfSelectedMusicians(rows, status)} />
            <div className="col-xs-12 text-right">
                <div className="btn-group">
                    <button 
                        disabled={!isRemoveButtonActive}
                        className="btn btn-default btn-primary"
                        onClick={() => removeMusiciansFromSong()}>
                        <i className="fa fa-times"></i> Eyða völdum flytjendum
                    </button>
                    <button 
                        className="btn btn-default btn-primary"
                        onClick={(e) => addMusicianToSong(e)}>
                        <i className="fa fa-plus"></i> Bæta við flytjanda
                    </button>
                </div>
            </div>
        </div>
    );
}

SongMusiciansTable.propTypes = {
    musicians: React.PropTypes.array.isRequired,
    addMusicianToSong: React.PropTypes.func.isRequired,
    addToListOfSelectedMusicians: React.PropTypes.func.isRequired,
    removeMusiciansFromSong: React.PropTypes.func.isRequired,
    isRemoveButtonActive: React.PropTypes.bool.isRequired
};

export default SongMusiciansTable;