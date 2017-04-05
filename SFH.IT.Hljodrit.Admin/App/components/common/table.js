import React, {PropTypes} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const Table = ({tableData, objects}) => {

    const createTableHeader = () => {
        return Object.keys(tableData).map((header, idx) => {
            return (
                <TableHeaderColumn
                   isKey={(idx === 0 ? true : false)}
                   dataField={header}
                   key={header}
                   dataSort={true}>
                   {tableData[header]}
               </TableHeaderColumn>
            );
        });
    };

    return (
        <div>
            <BootstrapTable data={objects} striped hover>
                {createTableHeader()}
            </BootstrapTable>
        </div>
    );
};

Table.propTypes = {
    tableData: PropTypes.object.isRequired,
    objects: PropTypes.array.isRequired
};

export default Table;
