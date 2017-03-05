import React from 'react';

export default class PersonListItem extends React.Component {
    render() {
        return (
            <div className="list well row" onClick={() => this.props.add(this.props.person)}>
                <div className="list-info col-xs-12">
                    <div className="list-name">
                        <div className="title">Nafn:</div>
                        <div className="value">{this.props.person.Fullname}</div>
                    </div>
                    <div className="list-author">
                        <div className="title">Heimilisfang:</div>
                        <div className="value">{this.props.person.Area}</div>
                    </div>
                </div>
            </div>
        );
    }
}
