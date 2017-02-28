import React from 'react';
import SearchBar from './searchBar';
import Filter from './filter';
import PersonListView from './personListView';

export default class Users extends React.Component {

    constructor() {
        super();

        this.state = {
            userTypes: [
                {action: 'performers', display: 'Flytjendur'} ,
                {action: 'producers', display: 'Framleiðendur'} ,
                {action: 'vip-users', display: 'VIP'}
            ],
            persons: [
                {name: 'Arnar banani', ssn: '1234567'},
                {name: 'bjoggi', ssn:'678974'},
                {name: 'Classic Balli', ssn: '09876543'}
            ]
        };


    }

    render() {
        return (
            <div>
                <h2>Aðilar</h2>
                <SearchBar />
                <Filter filters={this.state.userTypes} />
                <PersonListView persons={this.state.persons} />
            </div>
        );
    }
}
