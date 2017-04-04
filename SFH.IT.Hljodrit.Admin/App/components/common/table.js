import React, {PropTypes} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const Table = ({tableKey, tableData, objects}) => {

    const createTableHeader = () => {
        debugger;
        return Object.keys(tableData).map((header) => {
            return (
                <h1>Hallo</h1>
                /*<TableHeaderColumn isKey
                                   dataField={header}
                                   dataSort={true}>
                    {tableData[header]}
                </TableHeaderColumn>*/
                //{header === tableKey ? <TableHeaderColumn isKey dataField='name' dataSort={ true } >Name</TableHeaderColumn>}
            );
            //console.log(t);
        });
    };

    console.log("tableKey: " + tableKey);
    console.log("tableData: " + tableData);
    console.log("objects: " + objects);

    return (

        <div>
            /*<BootstrapTable data={objects} striped hover>
                <TableHeaderColumn isKey dataField='name' dataSort={ true } >Name</TableHeaderColumn>
                <TableHeaderColumn dataField='Position' dataSort={ true } >Position</TableHeaderColumn>
                <TableHeaderColumn dataField='Office' dataSort={ true } >Office</TableHeaderColumn>
                <TableHeaderColumn dataField='Age' dataSort={ true } >Age</TableHeaderColumn>
                <TableHeaderColumn dataField='StartDate' dataSort={ true } >Start date</TableHeaderColumn>
                <TableHeaderColumn dataField='Salary' dataSort={ true } >Salary</TableHeaderColumn>
                {createTableHeader()}
            </BootstrapTable>*/
        </div>
    );
};

Table.propTypes = {
    tableKey: PropTypes.string.isRequired,
    tableData: PropTypes.object.isRequired,
    objects: PropTypes.array.isRequired
};

export default Table;