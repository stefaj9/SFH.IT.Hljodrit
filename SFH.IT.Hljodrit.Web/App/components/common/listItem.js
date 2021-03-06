import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ item, rowClass, add }) => {
    return (
        <div className={'list hover-cursor list-item well row ' + rowClass} onClick={() => add({ id: item.id, name: item.fullName })}>
            <div className="list-info col-xs-12">
                <div className="list-name">
                    <div className="title">Nafn:</div>
                    <div className="value">{item.fullName}</div>
                </div>
                <div className="list-author">
                    <div className="title">Heimilisfang:</div>
                    <div className="value">{item.postalAddressLine1}</div>
                </div>
            </div>
        </div>
    );
};

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    rowClass: PropTypes.string,
    add: PropTypes.func
};

export default ListItem;