import React from 'react';
import Table from '../common/table';
import musicianAlbumTableData from './musicianAlbumTableData';

const MusicianAlbumTable = ({ musicianAlbums }) => {
    return (
        <div className="row">
            <h3>Plötur</h3>
            <Table
                tableData={ musicianAlbumTableData }
                objects={ musicianAlbums }
                isRemote={ false }
                pagination={ true }
                hidePageSize={ true }
                refCallback={ (ref) => { return ref; } } />
        </div>
    );
}

MusicianAlbumTable.propTypes = {
    musicianAlbums: React.PropTypes.array.isRequired
};

export default MusicianAlbumTable;