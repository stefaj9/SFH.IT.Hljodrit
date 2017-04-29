import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Header extends React.Component {
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
                    <div className={'navbar-header' + (!this.props.isLoggedIn ? ' navbar-height' : '')}>
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
                            <li><a><strong>{this.props.userName}</strong></a></li>
                        </ul>
                        <ul className={'nav navbar-nav' + (!this.props.isLoggedIn ? ' hidden' : '')}>
                            <li className={this.state.selectedItem === 'projects' ? 'active' : ''}>
                                <Link to="/projects" onClick={() => this.setState({ selectedItem: 'projects' })}>
                                    Verkefni
                                </Link>
                            </li>
                            <li>
                                <a href="#" onClick={() => this.props.logoutUser()}>Skrá út</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    userName: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    logoutUser: PropTypes.func
};

export default Header;