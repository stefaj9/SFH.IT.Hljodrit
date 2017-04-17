import React from 'react';
import Table from '../common/table';
import musicianMediaTableData from './musicianMediaTableData';

const MusicianMediaTable = ({ musicianMediaEnvelope, paginationCallback }) => {
    return (
        <div>
            <h3>Hljóðrit</h3>
            <Table
                tableData={ musicianMediaTableData }
                objects={ musicianMediaEnvelope.objects }
                hidePageSize={true}
                pagination={true}
                paginationCallback={paginationCallback}
                paginationTotalElements={ musicianMediaEnvelope.totalNumber }
                paginationCurrentPage={ musicianMediaEnvelope.currentPage }
                refCallback={(ref) => { return ref; }} />
        </div>
    );
};

MusicianMediaTable.propTypes = {
    musicianMediaEnvelope: React.PropTypes.object.isRequired,
    paginationCallback: React.PropTypes.func
};

export default MusicianMediaTable;