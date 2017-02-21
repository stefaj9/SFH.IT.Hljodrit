import React from 'react';

export default class ProjectBasicInfoModal extends React.Component {
    render() {
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>ProjectBasicInfoModal</div>
        );
    }
}