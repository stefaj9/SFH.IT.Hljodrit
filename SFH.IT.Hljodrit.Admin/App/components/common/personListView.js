import React from 'react';
import Spinner from 'react-spinner';
import PersonListItem from './personListItem';

export default class PersonListView extends React.Component {

    renderList() {
        if (!this.props.isFetching) {
            return this.props.persons.map((person) => {
                return <PersonListItem
                            key={person.id}
                            person={person}
                            add={(person) => this.props.add(person)} />
            });
        }
    }

    render() {
        return (
            <div className={!this.props.isFetching && this.props.persons.length === 0 ? 'hidden' : ''}>
                <Spinner className={this.props.isFetching ? '' : 'hidden'} />
                {this.renderList()}
            </div>
        );
    }
}
