import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import Spinner from 'react-spinner';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            showUsernameErrorMsg: false,
            showPasswordErrorMsg: false
        };
    }
    validateForm() {
        const { username, password } = this.state;

        if (username.length === 0) { this.setState({ showUsernameErrorMsg: true }) }
        if (password.length === 0) { this.setState({ showPasswordErrorMsg: true }) }

        return username.length > 0 && password.length > 0;
    }
    loginUser(e) {
        e.preventDefault();
        this.setState({ showUsernameErrorMsg: false, showPasswordErrorMsg: false });
        if (this.validateForm()) {
            const { username, password } = this.state;
            this.props.loginUser(username, password);
        }
    }
    render() {
        return (
            <div className="row">
                <div className={'col-xs-6 col-xs-push-3' + (this.props.isLoggingIn ? ' hidden' : '')}>
                    <h2>Innskráning</h2>
                    <form action="" className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="admin-email">Netfang</label>
                            <input autoFocus={true} type="text" id="admin-email" name="admin-email" className="form-control" onChange={(e) => this.setState({ username: e.target.value })} />
                            <p className={'error-message' + (this.state.showUsernameErrorMsg ? '' : ' hidden')}>Netfang má ekki vera tómt.</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="admin-pwd">Lykilorð</label>
                            <input type="password" id="admin-pwd" name="admin-pwd" className="form-control" onChange={(e) => this.setState({ password: e.target.value })} />
                            <p className={'error-message' + (this.state.showPasswordErrorMsg ? '' : ' hidden')}>Lykilorð má ekki vera tómt.</p>
                        </div>
                        <div className="form-group text-right">
                            <button className="btn btn-default btn-primary" onClick={(e) => this.loginUser(e)}>Skrá inn</button>
                        </div>
                    </form>
                </div>
                <div className={'text-center' + (this.props.isLoggingIn ? '' : ' hidden')}>
                    <Spinner />
                    <p>Skrái inn..</p>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn
    };
};

export default connect(mapStateToProps, { loginUser })(Login);