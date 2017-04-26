import React from 'react';
import PropTypes from 'prop-types';
import Sortable from 'react-sortablejs';

const SortableTable = ({ headers, items, remove, visible, onChange }) => {
    let renderHeaders = headers.map((header, idx) => { 
        return ( 
            <div key={`${header}-${idx}`} className="fake-table-header col-xs-2">{header}</div> 
        ); 
    });
    let renderItems = items.map((item, idx) => { 
        return ( 
            <li key={`${item.number}-${item.name}`} data-id={item.number} className="list-group-item row">
                <div className="list-group-data col-xs-2"></div>
                <div className="list-group-data col-xs-2">{item.number}</div>
                <div className="list-group-data col-xs-2">{item.name}</div>
                <div className="list-group-data col-xs-2">{item.length}</div>
                <div className="list-group-data col-xs-2">{item.isrc}</div>
                <div className="list-group-data col-xs-2"><a tabIndex={(idx + 1) + 7} href="#"><i onClick={(e) => remove(e, item.number)} className="fa fa-times"></i></a></div>
            </li>
        );
    })
    return (
        <div className={'fake-table' + (!visible ? ' hidden' : '')}>
            <div className="fake-table-headers row">
                {renderHeaders}
            </div>
            <Sortable
                options={{}}
                tag="ul"
                onChange={(order) => { onChange(order); }}>
                {renderItems}
            </Sortable>
        </div>
    );
};

SortableTable.propTypes = {
    items: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    remove: PropTypes.func
};

export default SortableTable;