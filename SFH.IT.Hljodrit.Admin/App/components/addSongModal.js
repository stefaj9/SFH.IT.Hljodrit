import React from 'react';

export default class AddSongModal extends React.Component {
    render() {
        return (
            <div className={this.props.isVisible ? '' : 'hidden'}>AddSongModal</div>
        );
    }
}