import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { refreshLogin } from '../../actions/authActions';
import TokenService from '../../services/tokenService';

class AuthAppContainer extends React.Component {
    componentDidMount() {
        TokenService.isValidToken().then(val => {
            if (!val) {
                browserHistory.push('/');
            } else {
                // The user has a valid token.
                this.props.refreshLogin();
            }
        }).catch(function (err) {
            // Invalid token - needs to be routed to login site
            console.log(err);
            browserHistory.push('/');
        });
    }
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

export default connect(null, { refreshLogin })(AuthAppContainer);