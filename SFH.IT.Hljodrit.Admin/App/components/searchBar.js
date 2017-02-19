import React from 'react';

export default class SearchBar extends React.Component {
    render() {
        return (
            <form>
                <div className="input-group search-bar">
                    <input type="text" className="form-control" placeholder="Leita.." aria-describedby="search-bar"/>
                    <span className="input-group-addon" id="search-bar">
                        <i className="fa fa-search"></i>
                    </span>
                </div>
            </form>
        );
    }
}
