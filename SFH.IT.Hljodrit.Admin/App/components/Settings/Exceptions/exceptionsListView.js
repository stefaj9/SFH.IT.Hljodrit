import React from 'react';
import Spinner from 'react-spinner';
import ExceptionListItem from './exceptionsListItem';

const ExceptionsListView = ({exceptions, isFetching}) => {
    const renderExceptionItems = () => {
        if (!isFetching) {
            return exceptions.map(exception => {
                return (
                    <ExceptionListItem key={exception.Id}
                                       exception={exception} />
                );
            });
        }
    };

    return (
        <div>
            <Spinner className={isFetching ? '' : 'hidden'} />
            {renderExceptionItems()}
        </div>
    );
};

export default ExceptionsListView;