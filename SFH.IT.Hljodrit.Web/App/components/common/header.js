import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Header extends React.Component {
    componentWillMount() {
        let splittedPath = location.pathname.split('/');
        let currentSelectedItem = '';
        if (splittedPath.length > 1) {
            if (splittedPath[1] === 'app') {
                if (splittedPath.length > 2) {
                    currentSelectedItem = splittedPath[2];
                }
            } else {
                currentSelectedItem = splittedPath[1];
            }
        }
        this.setState({ selectedItem: currentSelectedItem.toLowerCase() });
    }
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
                        <Link className="navbar-brand" to={this.props.isLoggedIn ? '/app' : '/'} onClick={() => this.setState({ selectedItem: '' })}>
                            <img alt="Brand" src="/App/resources/logo-hljodrit.png" />
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><a><strong>{this.props.userName}</strong></a></li>
                        </ul>
                        <ul className="nav navbar-nav">
                            <li className={this.state.selectedItem === 'info' ? 'active' : ''}>
                                <Link to="/info" onClick={() => this.setState({ selectedItem: 'info' })}>
                                    Upplýsingar
                                </Link>
                            </li>
                        </ul>
                        <ul className={'nav navbar-nav' + (!this.props.isLoggedIn ? ' hidden' : '')}>
                            <li className={this.state.selectedItem === 'projects' ? 'active' : ''}>
                                <Link to="/app/projects" onClick={() => this.setState({ selectedItem: 'projects' })}>
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