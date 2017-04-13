import React, {PropTypes} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import _ from 'lodash';

const Table = ({tableData, objects, onClickCallback, selectRow, selectRowMode, selectRowCallback, selectRowCallBackAll }) => {

    const createTableHeader = () => {
        return Object.keys(tableData).map((header) => {
            return (
                <TableHeaderColumn
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
    let indexedObjects = _.cloneDeep(objects);
    indexedObjects.map((idxObj, idx) => {
        return idxObj.idx = idx;
    });
    return (
        <div>
            <BootstrapTable 
              data={indexedObjects}
              options={{onRowClick: onClickCallback}}
              selectRow={selectRowOptions}
              trClassName="album-song-selection-row"
              striped 
              hover>
                <TableHeaderColumn
                  isKey={true}
                  dataField="idx"
                  key="idx"
                  dataSort={true}
                  hidden></TableHeaderColumn>
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
