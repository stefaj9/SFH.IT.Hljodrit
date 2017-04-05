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
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/" onClick={() => this.setState({ selectedItem: '' })}>
                            <img alt="Brand" src="/App/resources/logo-hljodrit.png" />
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className={this.state.selectedItem === 'projects' ? 'active' : ''}>
                                <Link to="/projects" onClick={() => this.setState({ selectedItem: 'projects' })}>
                                    Verkefnastýring
                                </Link>
                            </li>
                            <li className={this.state.selectedItem === 'media' ? 'active' : ''}>
                                <Link to="/media" onClick={() => this.setState({ selectedItem: 'media' })}>
                                    Hljóðrit
                                </Link>
                            </li>
                            <li className={this.state.selectedItem === 'calculations' ? 'active' : ''}>
                                <Link to="/calculations" onClick={() => this.setState({ selectedItem: 'calculations' })}>
                                    Útreikningar
                                </Link>
                            </li>
                            <li className={this.state.selectedItem === 'albums' ? 'active' : ''}>
                                <Link to="/albums" onClick={() => this.setState({ selectedItem: 'albums' })}>
                                    Plötur
                                </Link>
                            </li>
                            <li className={this.state.selectedItem === 'users' ? 'active' : ''}>
                                <Link to="/users" onClick={() => this.setState({ selectedItem: 'users' })}>
                                    Aðilar
                                </Link>
                            </li>
                            <li className={this.state.selectedItem === 'settings' ? 'active' : ''}>
                                <Link to="/settings" onClick={() => this.setState({ selectedItem: 'settings' })}>
                                    <i className="fa fa-cog hidden-xs"></i>
                                    <div className="visible-xs">Stillingar</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
