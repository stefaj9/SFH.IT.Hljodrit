import React from 'react';

export default class PersonListItem extends React.Component {

    render() {
        return (
            <div className="project well row">
                <div className="project-info col-md-6 col-xs-12">
                    <div className="project-name">
                        <div className="title">Nafn:</div>
                        <div className="value">{this.props.person.name}</div>
                    </div>
                    <div className="project-name">
                        <div className="title">Kennitala:</div>
                        <div className="value">{this.props.person.ssn}</div>
                    </div>
                    <div className="project-name">
                        <div className="title">Heimilisfang:</div>
                        <div className="value">blabla</div>
                    </div>
                    <div className="project-name">
                        <div className="title">Símanúmer:</div>
                        <div className="value">blabla</div>
                    </div>
                </div>
            </div>
        );
    }
}
