import React, {PropTypes} from 'react';
import Spinner from 'react-spinner';
import PublisherListItem from './publisherListItem';

const PublishersListView = ({publishers, isFetching, onSelect}) => {
    const renderPublishers = () => {
        if (!isFetching) {
            return publishers.map((publisher, idx) => {
                return (
                    <PublisherListItem key={idx}
                                   publisher={publisher}
                                   onSelect={onSelect} />
                );
            });
        }
    };

    return (
        <div>
            <Spinner className={isFetching ? '' : 'hidden'} />
            {renderPublishers()}
        </div>
    );
};

PublishersListView.propTypes = {
    publishers: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default PublishersListView;