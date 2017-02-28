import React from 'react';
import Spinner from 'react-spinner';
import PersonListItem from './personListItem';

export default class PersonListView extends React.Component {

    renderList() {
        if (!this.props.isFetching) {
            return this.props.persons.map((person) => {
                return <PersonListItem key={person.Id}
                        person={person} />
            });
        }
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
