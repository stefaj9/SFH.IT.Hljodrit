import React from 'react';

export default class Filter extends React.Component {


    renderFilters() {
        return this.props.filters.map((filter, index) => {
            return (
                <label htmlFor="checkbox-pending" className="checkbox-inline" key={index}>
                    <input type="checkbox"  id={'checkbox-' + filter.action} value={index}/>
                    {filter.display}
                </label>
            );
        });
    }

    render() {
        return (
            <div className="filter">
                {this.renderFilters()}
            </div>
        );
    }
}
