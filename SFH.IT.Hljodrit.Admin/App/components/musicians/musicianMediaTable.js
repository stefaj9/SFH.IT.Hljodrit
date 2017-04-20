import React from 'react';
import Table from '../common/table';
import musicianMediaTableData from './musicianMediaTableData';

const MusicianMediaTable = ({ musicianMedia }) => {
    return (
        <div className="row">
            <h3>Hljóðrit</h3>
            <Table
                tableData={ musicianMediaTableData }
                objects={ musicianMedia }
                hidePageSize={true}
                pagination={true}
                isRemote={false}
                refCallback={(ref) => { return ref; }} />
        </div>
    );
};

MusicianMediaTable.propTypes = {
    musicianMedia: React.PropTypes.array.isRequired
};

export default MusicianMediaTable;