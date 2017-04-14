import React from 'react';
//import { connect } from 'react-redux';

export default class MusicianDetails extends React.Component {
    render() {
        return (
            <h1>{this.props.routeParams.musicianId}</h1>
        );
    }
}