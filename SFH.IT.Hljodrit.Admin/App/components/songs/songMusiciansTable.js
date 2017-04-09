import React from 'react';
import SongTableData from './songTableData';
import Table from '../common/table';

const SongMusiciansTable = ({ musicians }) => {
    return (
        <div className="row">
            <Table
                tableData={SongTableData}
                objects={musicians} />
        </div>
    );
}

SongMusiciansTable.propTypes = {
    musicians: React.PropTypes.array.isRequired
};

export default SongMusiciansTable;