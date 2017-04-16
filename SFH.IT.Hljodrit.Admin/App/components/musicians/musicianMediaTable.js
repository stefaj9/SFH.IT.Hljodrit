import React from 'react';
import Table from '../common/table';
import musicianMediaTableData from './musicianMediaTableData';

const MusicianMediaTable = ({ musicianMedia }) => {
    return (
        <div>
            <Table
                tableData={ musicianMediaTableData }
                objects={ musicianMedia }
                refCallback={(ref) => { return ref; }} />
        </div>
    );
};

MusicianMediaTable.propTypes = {
    musicianMedia: React.PropTypes.array.isRequired
};

export default MusicianMediaTable;