import React from 'react';

export default class ListItem extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <div className={'list well row ' + this.props.rowClass} onClick={() => this.props.add({ id: item.id, name: item.fullName })}>
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
    }
}
