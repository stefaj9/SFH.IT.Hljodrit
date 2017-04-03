import React, {PropTypes} from 'react';
import Spinner from 'react-spinner';
import ExceptionListItem from './exceptionsListItem';

const ExceptionsListView = ({exceptions, isFetching, onSelect}) => {
    const renderExceptionItems = () => {
        if (!isFetching) {
            return exceptions.map(exception => {
                return (
                    <ExceptionListItem key={exception.Id}
                                       exception={exception}
                                       onSelect={onSelect} />
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

ExceptionsListView.propTypes = {
    exceptions: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default ExceptionsListView;