import React from 'react';

export default class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            searchInput: ''
        };
    }
    submitForm(e) {
        e.preventDefault();
        this.props.searchBy(this.state.searchInput);
    }
    render() {
        return (
            <form onSubmit={(e) => { this.submitForm(e); }}>
                <div className="input-group search-bar">
                    <input type="text" className="form-control" placeholder="Leita.." aria-describedby="search-bar" onChange={(e) => this.setState({ searchInput: e.target.value }) } />
                    <span className="input-group-addon" id="search-bar">
                        <i className="fa fa-search"><input type="submit" className="hidden" /></i>
                    </span>
                </div>
            </form>
        );
    }
}
