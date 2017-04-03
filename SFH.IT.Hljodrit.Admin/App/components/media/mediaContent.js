import React from 'react';
import * as types from './mediaTabTypes';

export default class Content extends React.Component {
    render () {
        return (
            <div>
                {this.props.activeTab.name === types.MEDIA_RECORDING ? <h2>{types.MEDIA_RECORDING}</h2> : null}
                {this.props.activeTab.name === types.PARTY_REAL ? <h2>{types.PARTY_REAL}</h2> : null}
                {this.props.activeTab.name === types.MEDIA_PRODUCT_PACKAGE ? <h2>{types.MEDIA_PRODUCT_PACKAGE}</h2> : null}
                {this.props.activeTab.name === types.PARTY_MAINARTIST ? <h2>{types.PARTY_MAINARTIST}</h2> : null}
                {this.props.activeTab.name === types.ORGANIZATION ? <h2>{types.ORGANIZATION}</h2> : null}
            </div>
        );
    }
}