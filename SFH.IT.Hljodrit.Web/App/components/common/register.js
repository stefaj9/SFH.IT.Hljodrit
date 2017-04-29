import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { registerUser } from '../../actions/authActions';
import TokenService from '../../services/tokenService';
import Spinner from 'react-spinner';

class Register extends React.Component {
    componentDidMount() {
        TokenService.isValidToken().then(val => {
            if (val) {
                browserHistory.push('/app');
            }
        }).catch(err => {
            // Swallow the error, do NOT route. The user has an invalid token.
            console.error(err);
        });
    }
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordRepeat: '',
            showNameErrMsg: false,
            showEmailErrMsg: false,
            showPasswordErrMsg: false,
            showPasswordRepeatErrMsg: false
        };
    }
    validateForm() {
        const { passwordRepeat, password, email, name } = this.state;
        let regex = /(?=.{8,})/;
        let emailRegex = /\w+@\w+\.\w+/;

        let match = password.match(regex) !== null;
        let isSame = (passwordRepeat === password) && password.length > 0;
        let nameIsNotEmpty = name.length > 0;
        let emailMatch = email.match(emailRegex) !== null;

        this.setState({
            showPasswordRepeatErrMsg: !isSame,
            showPasswordErrMsg: !match,
            showEmailErrMsg: !emailMatch,
            showNameErrMsg: !nameIsNotEmpty
        });

        if (match && isSame && nameIsNotEmpty && emailMatch) { 
            this.setState({ 
                showPasswordErrMsg: false, 
                showPasswordRepeatErrMsg: false, 
                showNameErrMsg: false, 
                showEmailErrMsg: false
            });
            return true;
        }
        return false;
    }
    registerUser(e) {
        e.preventDefault();
        if (!this.validateForm()) { return; }
        const { name, email, password, passwordRepeat } = this.state;
        this.props.registerUser(name, email, password, passwordRepeat);
    }
    render() {
        const { name, email, password, passwordRepeat, showNameErrMsg, showEmailErrMsg, showPasswordErrMsg, showPasswordRepeatErrMsg } = this.state;
        return (
            <div>
                <div className={this.props.isRegistering ? 'hidden' : ''}>
                    <h2>Nýskráning</h2>
                    <form action="" onSubmit={e => this.registerUser(e)}>
                        <div className="form-group">
                            <label htmlFor="register-name">Nafn</label>
                            <input autoFocus={true} id="register-name" name="register-name" type="text" className="form-control" onChange={(e) => this.setState({ name: e.target.value })} value={name} />
                            <p className={'error-message ' + (showNameErrMsg ? '' : 'hidden')}>Nafn má ekki vera tómt.</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-email">Netfang</label>
                            <input type="text" id="register-email" name="register-email" className="form-control" onChange={(e) => this.setState({ email: e.target.value })} value={email} />
                            <p className={'error-message ' + (showEmailErrMsg ? '' : 'hidden')}>Netfang er ekki á réttu formi.</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-password">Lykilorð</label>
                            <input type="password" id="register-password" name="register-password" className="form-control" onChange={(e) => this.setState({ password: e.target.value })} value={password} />
                            <p className={'error-message ' + (showPasswordErrMsg ? '' : 'hidden')}>Lykilorð þarf að vera að lágmarki 8 stafir.</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-password-repeat">Lykilorð endurtekið</label>
                            <input type="password" id="register-password-repeat" name="register-password-repeat" className="form-control" onChange={(e) => this.setState({ passwordRepeat: e.target.value })} value={passwordRepeat} />
                            <p className={'error-message ' + (showPasswordRepeatErrMsg ? '' : 'hidden')}>Lykilorðin eru ekki þau sömu.</p>
                        </div>
                        <div className="form-group text-right">
                            <button className="btn btn-default btn-primary">Nýskrá</button>
                        </div>
                    </form>
                </div>
                <Spinner className={this.props.isRegistering ? '' : 'hidden'} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering
    };
};

export default connect(mapStateToProps, { registerUser })(Register);