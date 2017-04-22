import React from 'react';

export default class MediaContainer extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}