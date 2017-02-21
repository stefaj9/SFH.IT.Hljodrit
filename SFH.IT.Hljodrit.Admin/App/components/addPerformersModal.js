import React from 'react';

export default class AddPerformersModal extends React.Component {
    render() {
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>AddPerformersModal</div>
        );
    }
}