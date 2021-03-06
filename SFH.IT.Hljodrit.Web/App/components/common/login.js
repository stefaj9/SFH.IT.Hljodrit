import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { loginUser } from '../../actions/authActions';
import TokenService from '../../services/tokenService';
import Spinner from 'react-spinner';

class Login extends React.Component {
    componentDidMount() {
        TokenService.isValidToken().then(val => {
            if (val) {
                browserHistory.push('/app');
            }
        }).catch(() => {
            // Swallow the error, do NOT route. The user has an invalid token.
        });
    }
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            showUsernameErrMsg: false,
            showPasswordErrMsg: false
        };
    }
    validateForm() {
        const { username, password } = this.state;
        let usernameIsEmpty = username.length === 0;
        let passwordIsEmpty = password.length === 0;

        this.setState({ showUsernameErrMsg: usernameIsEmpty, showPasswordErrMsg: passwordIsEmpty });

        if (!usernameIsEmpty && !passwordIsEmpty) {
            return true;
        }
        return false;
    }
    submitLogin(e) {
        e.preventDefault();
        if (!this.validateForm()) { return; }
        const { username, password } = this.state;
        this.props.loginUser(username, password);
        this.setState({ username: '', password: '' });
    }
    render() {
        const { username, password, showUsernameErrMsg, showPasswordErrMsg } = this.state;
        return (
            <div className="col-xs-6 col-xs-push-3">
                <div className={this.props.isLoggingIn ? 'hidden' : ''}>
                    <h2>Innskráning</h2>
                    <form action="" onSubmit={(e) => this.submitLogin(e)}>
                        <div className="form-group">
                            <label htmlFor="">Netfang</label>
                            <input autoFocus={true} type="text" className="form-control" onChange={(e) => this.setState({ username: e.target.value })} value={username} />
                            <p className={'error-message ' + (showUsernameErrMsg ? '' : 'hidden')}>Netfang má ekki vera tómt.</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Lykilorð</label>
                            <input type="password" className="form-control" onChange={(e) => this.setState({ password: e.target.value })} value={password} />
                            <p className={'error-message ' + (showPasswordErrMsg ? '' : 'hidden')}>Lykilorð má ekki vera tómt.</p>
                        </div>
                        <div className="form-group text-right">
                            <button className="btn btn-default btn-primary">Skrá inn</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <p>Ef þú átt ekki aðgang, er hægt að stofna með því að smella á hlekk hér fyrir neðan</p>
                        <Link to="register">Nýskráning</Link>
                    </div>
                </div>
                <Spinner className={this.props.isLoggingIn ? '' : 'hidden'} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn
    };
};

export default connect(mapStateToProps, { loginUser })(Login);