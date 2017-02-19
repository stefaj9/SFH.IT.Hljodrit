import React from 'react';
import PersonListItem from './personListItem';

export default class PersonListView extends React.Component {

    renderList() {
        return this.props.persons.map((person) => {
            return <PersonListItem key={person.ssn}
                    person={person} />
        });
    }

    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }
}
