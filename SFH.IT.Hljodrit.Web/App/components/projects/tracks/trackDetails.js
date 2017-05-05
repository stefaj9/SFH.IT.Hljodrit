import React from 'react';

export default class TrackContainer extends React.Component {
    render() {
        return (
            <div>{this.props.routeParams.trackId}</div>
        );
    }
}