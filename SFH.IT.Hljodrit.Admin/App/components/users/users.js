import React from 'react';
import SearchBar from '../common/searchBar';
import Filter from '../common/filter';
import PersonListView from '../common/personListView';

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
                {Id: 1, name: 'Arnar banani', ssn: '1234567'},
                {Id: 2, name: 'bjoggi', ssn:'678974'},
                {Id: 3, name: 'Classic Balli', ssn: '09876543'}
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
