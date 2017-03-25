import React from 'react';
import Exceptions from './Exceptions/exceptions';
import * as types from './tabTypes';

export default class Content extends React.Component {
    render () {
        return (
            <div>
                {this.props.activeTab.name === types.EXCEPTIONS ? <Exceptions/> : null}
                {this.props.activeTab.name === types.OTHER_TAB ? <h3 className="text-left">Other stuff</h3> : null}
            </div>
        );
    }
}