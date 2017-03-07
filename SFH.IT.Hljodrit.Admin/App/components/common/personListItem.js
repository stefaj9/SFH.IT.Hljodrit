import React from 'react';

export default class PersonListItem extends React.Component {
    render() {
        const { person } = this.props;
        return (
            <div className="list well row" onClick={() => this.props.add({ id: person.id, name: person.fullName })}>
                <div className="list-info col-xs-12">
                    <div className="list-name">
                        <div className="title">Nafn:</div>
                        <div className="value">{person.fullName}</div>
                    </div>
                    <div className="list-author">
                        <div className="title">Heimilisfang:</div>
                        <div className="value">{person.postalAddressLine1}</div>
                    </div>
                </div>
            </div>
        );
    }
}
