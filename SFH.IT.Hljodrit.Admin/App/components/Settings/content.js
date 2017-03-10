import React from 'react';
import Exceptions from './Exceptions/exceptions';
import * as types from './tabTypes';

export default class Content extends React.Component {
    render () {
        return (
            <div>
                {this.props.activeTab.name === types.EXCEPTIONS ? <Exceptions/> : null}
                {this.props.activeTab.name === types.OTHER_TAB ? <h2>Other stuff</h2> : null}
            </div>
        );
    }
}