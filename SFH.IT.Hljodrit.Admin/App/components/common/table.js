import React, {PropTypes} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import _ from 'lodash';

const Table = ({tableData, objects, onClickCallback, selectRow, selectRowMode, selectRowCallback, selectRowCallBackAll, tableRowClassName }) => {

    const createTableHeader = () => {
        return Object.keys(tableData).map((header) => {
            let formatter = tableData[header].formatter;
            let sortable = tableData[header].sortable;
            let width = tableData[header].width;
            let dataAlign = tableData[header].dataAlign;
            let sortFunc = tableData[header].sortFunc;
            return (
                <TableHeaderColumn
                   dataField={header}
                   key={header}
                   dataSort={sortable}
                   dataFormat={formatter}
                   dataAlign={dataAlign}
                   width={width}
                   sortFunc={sortFunc}>
                   { tableData[header].value }
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
        <div className="col-xs-12">
            <BootstrapTable
              data={indexedObjects}
              options={{onRowClick: onClickCallback}}
              selectRow={selectRowOptions}
              trClassName={tableRowClassName}
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
    selectRowCallBackAll: PropTypes.func,
    tableRowClassName: PropTypes.string
};

export default Table;
