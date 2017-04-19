import React from 'react';

export default class MusiciansContainer extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}