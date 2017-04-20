import React from 'react';
import Tabs from '../common/tabs';
import TabItems from './tabData';
import Content from './content';

export default class Settings extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            tabData: TabItems,
            activeTab: TabItems[0]
        };
    }

    handleClick(tab) {
        this.setState({
            activeTab: tab
        });
    }

    render() {
        return (
            <div>
                <h2>Stillingar</h2>
                <Tabs tabData={this.state.tabData} activeTab={this.state.activeTab}
                    changeTab={(newTab) => this.handleClick(newTab)} />
                <Content activeTab={this.state.activeTab} />
            </div>
        );
    }
}