import React from 'react';

export default class AlbumDetailsContainer extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}