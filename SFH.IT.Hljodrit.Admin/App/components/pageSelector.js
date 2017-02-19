import React from 'react';

export default class PageSelector extends React.Component {
    render() {
        return (
            <div className="page-selector-wrapper">
                <select name="page-selector" id="page-selector" className="form-control" title="Veldu fjölda af færslum" onChange={(e) => { this.props.change(e.target.value) }}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        );
    }
}