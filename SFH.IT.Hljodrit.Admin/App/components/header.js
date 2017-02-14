import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedItem: ''
        };
    }
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/" onClick={() => this.setState({ selectedItem: '' })}>
                            <img alt="Brand" src="../App/resources/logo-hljodrit.png" />
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="nav navbar-nav pull-right">
                            <li className={this.state.selectedItem === 'about' ? 'active' : ''}>
                                <Link to="settings" onClick={() => this.setState({ selectedItem: 'about' })}>About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
