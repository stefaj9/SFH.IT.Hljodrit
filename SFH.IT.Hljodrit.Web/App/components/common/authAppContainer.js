import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { refreshLogin, clearLogin } from '../../actions/authActions';
import { getZipCodes, getCountries } from '../../actions/commonActions';
import { getProjectStatus } from '../../actions/projectActions';
import TokenService from '../../services/tokenService';

class AuthAppContainer extends React.Component {
    componentDidMount() {
        TokenService.isValidToken().then(val => {
            if (!val) {
                this.props.clearLogin();
                browserHistory.push('/');
            } else {
                // The user has a valid token.
                this.props.refreshLogin();
                this.props.getZipCodes();
                this.props.getCountries();
                this.props.getProjectStatus();
            }
        }).catch(() => {
            // Invalid token - needs to be routed to login site
            this.props.clearLogin();
            browserHistory.push('/');
        });
    }
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

export default connect(null, { refreshLogin, clearLogin, getZipCodes, getCountries, getProjectStatus })(AuthAppContainer);