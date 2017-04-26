import React from 'react';

export default class PublishersContainer extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}