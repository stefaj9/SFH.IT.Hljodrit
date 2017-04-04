import React, {PropTypes} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const Table = ({tableData, objects}) => {

    const createTableHeader = () => {
        return Object.keys(tableData).map((header, idx) => {
            console.log(header);
            return (
                <TableHeaderColumn
                                   isKey={(idx === 0 ? true : false)}
                                   dataField={header}
                                   key={header}
                                   dataSort={true}>
                    {tableData[header]}
                </TableHeaderColumn>
                //{header === tableKey ? <TableHeaderColumn isKey dataField='name' dataSort={ true } >Name</TableHeaderColumn>}
            );
        });
    };

    // console.log("tableKey: " + tableKey);
    // console.log("tableData: " + tableData);
 console.log("objects: " + objects);

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
