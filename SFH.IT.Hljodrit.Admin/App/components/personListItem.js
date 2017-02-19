import React from 'react';

export default class PersonListItem extends React.Component {

    render() {
        return (
            <div className="list well row">
                <div className="list-info col-md-6 col-xs-12">
                    <div className="list-name">
                        <div className="title">Nafn:</div>
                        <div className="value">{this.props.person.name}</div>
                    </div>
                    <div className="list-author">
                        <div className="title">Kennitala:</div>
                        <div className="value">{this.props.person.ssn}</div>
                    </div>
                    <div className="list-author">
                        <div className="title">Heimilisfang:</div>
                        <div className="value">blabla</div>
                    </div>
                    <div className="list-author">
                        <div className="title">Símanúmer:</div>
                        <div className="value">blabla</div>
                    </div>
                </div>
                <hr className="visible-sm visible-xs list-divider" />
                <div className="list-actions col-md-6 col-xs-12">
                    <div className="list-action">
                        <i className="fa fa-2x fa-pencil"></i>
                        <div>Breyta</div>
                    </div>
                    <div className="list-action">
                        <i className="fa fa-2x fa-times"></i>
                        <div>Eyða</div>
                    </div>
                </div>
            </div>
        );
    }
}
