import React from 'react';
//import Table from '../common/table';

export default class Songs extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            searchString: ''
        }
    }

    searchBy(searchString) {
        this.setState({
            searchString: searchString
        });
        //this.props.getAllProjects(this.state.pageSize, this.state.page, this.state.filters, searchString);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1>Songs</h1>
                </div>

            </div>
        );
    }
}