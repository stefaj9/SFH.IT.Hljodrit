import React, {PropTypes} from 'react';
import Table from '../common/table';
import {browserHistory} from 'react-router';
import mediaTableData from './mediaTableData';
import PageSelector from '../common/pageSelector';
import Paging from '../common/paging';
import Spinner from 'react-spinner';

const MediaTable = ({isFetching, objects, currentPage, maximumPage, changePageSize, changePageNumber}) => {

    const renderMediaTable = () => {
        if (!isFetching) {
            return (
                <div>
                    <PageSelector visible={!isFetching}
                                  change={newPageSize => changePageSize(newPageSize)} />
                    <div className="row">
                        <Table tableData={mediaTableData}
                               objects={objects}
                               onClickCallback={(row) => browserHistory.push(`/app/media/${row.mediaId}`)}
                               refCallback={ref => { return ref; }}
                               isRemote={false}
                               pagination={false} />
                    </div>
                    <Paging visible={!isFetching}
                            currentPage={currentPage}
                            maximumPage={maximumPage}
                            changePage={newPageNumber => changePageNumber(newPageNumber)} />
                </div>
            );
        }
    };

    return (
        <div>
            <Spinner className={isFetching ? '' : 'hidden'} />
            {renderMediaTable()}
        </div>
    );
};

MediaTable.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    objects: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    maximumPage: PropTypes.number.isRequired,
    changePageSize: PropTypes.func.isRequired,
    changePageNumber: PropTypes.func.isRequired
};

export default MediaTable;