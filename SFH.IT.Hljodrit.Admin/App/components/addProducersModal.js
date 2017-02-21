import React from 'react';

export default class AddProducersModal extends React.Component {
    render() {
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>AddProducersModal</div>
        );
    }
}