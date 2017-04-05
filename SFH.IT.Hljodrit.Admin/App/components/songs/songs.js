import React from 'react';

export default class Songs extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    handleClick(tab) {
        this.setState({
            activeTab: tab
        });
    }

    render() {
        return (
            <div>
                <h1>Songs</h1>
            </div>
        );
    }
}