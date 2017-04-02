import React from 'react';
import Sortable from 'react-sortablejs';

class SortableTable extends React.Component {
    render() {
        let headers = this.props.headers.map((header, idx) => { 
            return ( 
                <div key={`${header}-${idx}`} className="fake-table-header col-xs-2">{header}</div> 
            ); 
        });
        let items = this.props.items.map((item) => { 
            return ( 
                <li key={`${item.number}-${item.name}`} data-id={item.number} className="list-group-item row">
                    <div className="list-group-data col-xs-2"></div>
                    <div className="list-group-data col-xs-2">{item.number}</div>
                    <div className="list-group-data col-xs-2">{item.name}</div>
                    <div className="list-group-data col-xs-2">{item.length}</div>
                    <div className="list-group-data col-xs-2">{item.isrc}</div>
                    <div className="list-group-data col-xs-2"><a href="#"><i onClick={(e) => this.props.remove(e, item.number)} className="fa fa-times"></i></a></div>
                </li>
            );
        })
        return (
            <div className={'fake-table' + (!this.props.visible ? ' hidden' : '')}>
                <div className="fake-table-headers row">
                    {headers}
                </div>
                <Sortable
                    options={{}}
                    tag="ul"
                    onChange={(order) => { this.props.onChange(order); }}>
                    {items}
                </Sortable>
            </div>
        );
    }
};

SortableTable.propTypes = {
    items: React.PropTypes.array,
    headers: React.PropTypes.array,
    onChange: React.PropTypes.func,
    remove: React.PropTypes.func
};

export default SortableTable;