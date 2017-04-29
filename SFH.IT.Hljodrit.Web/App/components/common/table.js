import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';

class Table extends React.Component {
    createTableHeader() {
        let tableData = this.props.tableData;
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
    }
    render() {
        const { objects, onClickCallback, selectRow, selectRowMode, selectRowCallback, selectRowCallBackAll, tableRowClassName, refCallback, hidePageSize, pagination, paginationCallback, paginationTotalElements, paginationCurrentPage, isRemote, onSortChange } = this.props;
        let selectRowOptions;
        if (selectRow) {
            selectRowOptions = {
                mode: selectRowMode,
                onSelect: selectRowCallback,
                onSelectAll: selectRowCallBackAll
            };
        }
        let options = {
            onRowClick: onClickCallback,
            hideSizePerPage: hidePageSize,
            onPageChange: paginationCallback,
            page: paginationCurrentPage,
            onSortChange: onSortChange,
            noDataText: 'Engin gögn í boði.'
        };
        let indexedObjects = _.cloneDeep(objects);
        indexedObjects.map((idxObj, idx) => {
            return idxObj.idx = idx;
        });
        return (
            <div className="col-xs-12">
                <BootstrapTable
                  data={indexedObjects}
                  options={options}
                  selectRow={selectRowOptions}
                  trClassName={tableRowClassName}
                  striped
                  ref={(ref) => refCallback(ref)}
                  hover
                  pagination={pagination}
                  ignoreSinglePage
                  remote={isRemote}
                  fetchInfo={{dataTotalSize: paginationTotalElements}}>
                    <TableHeaderColumn
                      isKey={true}
                      dataField="idx"
                      key="idx"
                      dataSort={true}
                      hidden></TableHeaderColumn>
                    {this.createTableHeader()}
                </BootstrapTable>
            </div>
        );
    }
}

Table.propTypes = {
    tableData: PropTypes.object.isRequired,
    objects: PropTypes.array.isRequired,
    refCallback: PropTypes.func.isRequired,
    isRemote: PropTypes.bool.isRequired,
    pagination: PropTypes.bool.isRequired,
    onClickCallback: PropTypes.func,
    selectRow: PropTypes.bool,
    selectRowMode: PropTypes.string,
    selectRowCallback: PropTypes.func,
    selectRowCallBackAll: PropTypes.func,
    tableRowClassName: PropTypes.string,
    hidePageSize: PropTypes.bool,
    paginationCallback: PropTypes.func,
    paginationTotalElements: PropTypes.number,
    paginationCurrentPage: PropTypes.number,
    onSortChange: PropTypes.func
};

export default Table;
