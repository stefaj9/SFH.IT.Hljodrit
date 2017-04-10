import React from 'react';
import SongTableData from './songTableData';
import Table from '../common/table';

const SongMusiciansTable = ({ musicians, addMusicianToSong }) => {
    return (
        <div className="row">
            <Table
                tableData={SongTableData}
                objects={musicians} />
            <div className="col-xs-12 text-right">
                <button 
                    className="btn btn-default btn-primary"
                    onClick={(e) => addMusicianToSong(e)}>
                    <i className="fa fa-plus"></i> Bæta við flytjanda
                </button>
            </div>
        </div>
    );
}

SongMusiciansTable.propTypes = {
    musicians: React.PropTypes.array.isRequired,
    addMusicianToSong: React.PropTypes.func.isRequired
};

export default SongMusiciansTable;