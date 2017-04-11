import React, {PropTypes} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const Table = ({tableData, objects, onClickCallback, selectRow, selectRowMode, selectRowCallback, selectRowCallBackAll }) => {

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
    let selectRowOptions;
    if (selectRow) {
        selectRowOptions = {
            mode: selectRowMode,
            onSelect: selectRowCallback,
            onSelectAll: selectRowCallBackAll
        };
    }
    
    return (
        <div>
            <BootstrapTable 
              data={objects}
              options={{onRowClick: onClickCallback}}
              selectRow={selectRowOptions}
              trClassName="album-song-selection-row"
              striped 
              hover>
                {createTableHeader()}
            </BootstrapTable>
        </div>
    );
};

Table.propTypes = {
    tableData: PropTypes.object.isRequired,
    objects: PropTypes.array.isRequired,
    onClickCallback: PropTypes.func,
    selectRow: PropTypes.bool,
    selectRowMode: PropTypes.string,
    selectRowCallback: PropTypes.func,
    selectRowCallBackAll: PropTypes.func
};

export default Table;
