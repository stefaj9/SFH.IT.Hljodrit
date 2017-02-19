import React from 'react';
import SearchBar from './SearchBar';
import Filter from './filter';

export default class Users extends React.Component {
    render() {
        return (
            <div>
                <h2>Aðilar</h2>
                <SearchBar />
                <Filter filters={[
                    {action: 'performers', display: 'Flytjendur'},
                    {action: 'producers', display: 'Framleiðendur'},
                    {action: 'vip-users', display: 'VIP'}
                ]} />
            </div>
        );
    }
}
