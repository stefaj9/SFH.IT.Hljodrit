import React from 'react';

export default class OverviewProjectModal extends React.Component {
    render() {
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>OverviewProjectModal</div>
        );
    }
}