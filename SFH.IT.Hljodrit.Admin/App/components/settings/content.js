import React from 'react';
import Exceptions from './Exceptions/exceptions';
import Users from './users/users';
import * as types from './tabTypes';

export default class Content extends React.Component {
    render () {
        return (
            <div>
                {this.props.activeTab.name === types.EXCEPTIONS ? <Exceptions /> : null}
                {this.props.activeTab.name === types.USER_MANAGEMENT ? <Users /> : null}
            </div>
        );
    }
}