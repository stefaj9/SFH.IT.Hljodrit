import React from 'react';
import SearchBar from './SearchBar';
import ProjectFilter from './projectFilter';

export default class Users extends React.Component {
    render() {
        return (
            <div>
                <h2>Aðilar</h2>
                <SearchBar />
                <ProjectFilter filters={
                    [{ action: 'performers', display: 'Flytjendur'},
                     { action: 'producers', display: 'Framleiðendur'},
                      { action: 'vip-users', display: 'VIP'},
                    ]} />
            </div>
        );
    }
}
