import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinner';
import ListItem from './listItem';

const ListView = ({ isFetching, items, add, rowClass }) => {
    function renderList() {
        if (!isFetching) {
            return items.map((item) => {
                return <ListItem
                            key={item.id}
                            item={item}
                            add={(item) => add(item)}
                            rowClass={rowClass} />
            });
        }
    }

    return (
        <div className={!isFetching && items.length === 0 ? 'hidden' : ''}>
            <Spinner className={isFetching ? '' : 'hidden'} />
            {renderList()}
        </div>
    );
}

ListView.propTypes = {
    items: PropTypes.array.isRequired,
    add: PropTypes.func,
    rowClass: PropTypes.string,
    isFetching: PropTypes.bool
};

export default ListView;