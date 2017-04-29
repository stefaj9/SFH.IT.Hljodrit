import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loginUser } from '../../actions/authActions';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
    }
    submitLogin() {
        const { username, password } = this.state;
        this.props.loginUser(username, password);
    }
    render() {
        const { username, password } = this.state;
        return (
            <div>
                <h2>Innskráning</h2>
                <form action="" onSubmit={() => this.submitLogin()}>
                    <div className="form-group">
                        <label htmlFor="">Notandanafn</label>
                        <input autoFocus={true} type="text" className="form-control" onChange={(e) => this.setState({ username: e.target.value })} value={username} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Lykilorð</label>
                        <input type="password" className="form-control" onChange={(e) => this.setState({ password: e.target.value })} value={password} />
                    </div>
                    <div className="form-group text-right">
                        <button className="btn btn-default btn-primary">Skrá inn</button>
                    </div>
                </form>
                <div className="col-xs-6 col-xs-push-3 text-center">
                    <p>Ef þú átt ekki aðgang, er hægt að stofna með því að smella á hlekk hér fyrir neðan</p>
                    <Link to="register">Nýskráning</Link>
                </div>
            </div>
        );
    }
}

export default connect(null, { loginUser })(Login);