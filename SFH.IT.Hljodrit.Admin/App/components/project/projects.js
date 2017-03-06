import React from 'react';

export default class Projects extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}