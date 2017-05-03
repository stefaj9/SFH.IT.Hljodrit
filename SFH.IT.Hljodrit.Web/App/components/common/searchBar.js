import React from 'react';

export default class SearchBar extends React.Component {
    componentWillReceiveProps(newProps) {
        this.setState({
            searchInput: newProps.searchTerm
        });
    }
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
            <form className={this.props.visible ? '' : 'hidden'} onSubmit={(e) => { this.submitForm(e); }}>
                <div className={this.props.iconOn ? 'input-group search-bar' : ''}>
                    <input 
                        value={this.state.searchInput}
                        type="text" 
                        className="form-control no-border-radius" 
                        placeholder="Leita.." 
                        aria-describedby="search-bar" 
                        onChange={(e) => this.setState({ searchInput: e.target.value }) } />
                    <span className={this.props.iconOn ? 'input-group-addon' : 'hidden'} id="search-bar">
                        <i className="fa fa-search"><input type="submit" className="hidden" /></i>
                    </span>
                </div>
            </form>
        );
    }
}
