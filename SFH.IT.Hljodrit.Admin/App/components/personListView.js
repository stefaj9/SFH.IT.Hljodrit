import React from 'react';
import Spinner from 'react-spinner';
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
                <Spinner className={this.props.isFetching ? '' : 'hidden'} />
                {this.renderList()}
            </div>
        );
    }
}
