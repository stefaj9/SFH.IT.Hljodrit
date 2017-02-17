import React from 'react';

export default class ProjectFilter extends React.Component {
    render() {
        return (
            <div className="project-filter">
                <label htmlFor="checkbox-pending" className="checkbox-inline">
                    <input type="checkbox" id="checkbox-pending" value="0"/>
                    Í bið
                </label>
                <label htmlFor="checkbox-resent" className="checkbox-inline">
                    <input type="checkbox" id="checkbox-resent" value="1"/>
                    Endursendar
                </label>
                <label htmlFor="checkbox-accepted" className="checkbox-inline">
                    <input type="checkbox" id="checkbox-accepted" value="2"/>
                    Samþykktar
                </label>
            </div>
        );
    }
}