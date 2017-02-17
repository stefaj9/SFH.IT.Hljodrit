import React from 'react';

export default class ProjectSearchBar extends React.Component {
    render() {
        return (
            <div className="input-group project-search-bar">
                <span className="input-group-addon" id="project-search-bar">
                    <i className="fa fa-search"></i>
                </span>
                <input type="text" className="form-control" placeholder="Leita.." aria-describedby="project-search-bar"/>
            </div>
        );
    }
}