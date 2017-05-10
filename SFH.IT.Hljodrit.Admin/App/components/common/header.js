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
    changeSelectedItem(item) {
        if (this.props.isLoggedIn) {
            this.setState({ selectedItem: item });
        }
    }
    render() {
        const { selectedItem } = this.state;
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className={'navbar-header' + (!this.props.isLoggedIn? ' navbar-height': '')}>
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to={this.props.isLoggedIn ? '/app' : '/'} onClick={() => this.changeSelectedItem('')}>
                            <img alt="Brand" src="/App/resources/logo-hljodrit.png" />
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className={'nav navbar-nav' + (!this.props.isLoggedIn ? ' hidden' : '')}>
                            <li className={selectedItem === 'projects' ? 'active' : ''}>
                                <Link to="/app/projects" onClick={() => this.changeSelectedItem('projects')}>
                                    Verkefnastýring
                                </Link>
                            </li>
                            <li className={selectedItem === 'media' ? 'active' : ''}>
                                <Link to="/app/media" onClick={() => this.changeSelectedItem('media')}>
                                    Hljóðrit
                                </Link>
                            </li>
                            <li className={selectedItem === 'publishers' ? 'active' : ''}>
                                <Link to="/app/publishers" onClick={() => this.changeSelectedItem('publishers')}>
                                    Útgefendur
                                </Link>
                            </li>
                            <li className={selectedItem === 'albums' ? 'active' : ''}>
                                <Link to="/app/albums" onClick={() => this.changeSelectedItem('albums')}>
                                    Plötur
                                </Link>
                            </li>
                            <li className={selectedItem === 'musicians' ? 'active' : ''}>
                                <Link to="/app/musicians" onClick={() => this.changeSelectedItem('musicians')}>
                                    Aðilar
                                </Link>
                            </li>
                            <li className={selectedItem === 'info' ? 'active' : ''}>
                                <Link to="info" onClick={() => this.changeSelectedItem('info')}>
                                    Upplýsingar
                                </Link>
                            </li>
                            <li>
                                <a onClick={() => this.props.logoutUser()}>Skrá út</a>
                            </li>
                            <li className={selectedItem === 'settings' ? 'active' : ''}>
                                <Link to="/app/settings" onClick={() => this.changeSelectedItem('settings')}>
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

Header.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired
}

export default Header;