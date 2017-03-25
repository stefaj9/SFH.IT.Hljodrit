import React, {PropTypes} from 'react';
import Tab from './Tab';

const Tabs = ({tabData, activeTab, changeTab}) => {
    return (
        <ul className="nav nav-tabs">
            {tabData.map((tab) => {
                return (
                    <Tab key={tab.name} data={tab} isActive={activeTab === tab}
                         handleClick={() => changeTab(tab)} />
                );
            })}
        </ul>
    );
};

Tabs.propTypes = {
    tabData: PropTypes.array.isRequired,
    activeTab: PropTypes.object.isRequired,
    changeTab: PropTypes.func.isRequired
};

export default Tabs;