import React from 'react';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            username: '',
            password: '',
            passwordRepeat: '',
            showNameErrMsg: false,
            showUsernameErrMsg: false,
            showPasswordErrMsg: false,
            showPasswordRepeatErrMsg: false
        };
    }
    validateForm() {
        const { passwordRepeat, password, username, name } = this.state;
        let regex = /(?=.{8,})/;

        let match = password.match(regex) !== null;
        let isSame = (passwordRepeat === password) && password.length > 0;
        let nameIsNotEmpty = name.length > 0;
        let usernameIsNotEmpty = username.length > 0;

        this.setState({
            showPasswordRepeatErrMsg: !isSame,
            showPasswordErrMsg: !match,
            showUsernameErrMsg: !usernameIsNotEmpty,
            showNameErrMsg: !nameIsNotEmpty
        });

        if (match && isSame && nameIsNotEmpty && usernameIsNotEmpty) { 
            this.setState({ 
                showPasswordErrMsg: false, 
                showPasswordRepeatErrMsg: false, 
                showNameErrMsg: false, 
                showUsernameErrMsg: false
            });
            return true;
        }
        return false;
    }
    registerUser(e) {
        e.preventDefault();
        if (!this.validateForm()) { return; }
        console.log(e);
        // TODO: Issue register request with information and redirect user to site.
    }
    render() {
        const { name, username, password, passwordRepeat, invalid, showNameErrMsg, showUsernameErrMsg, showPasswordErrMsg, showPasswordRepeatErrMsg } = this.state;
        return (
            <div>
                <h2>Nýskráning</h2>
                <form action="" onSubmit={e => this.registerUser(e)}>
                    <div className="form-group">
                        <label htmlFor="register-name">Nafn</label>
                        <input id="register-name" name="register-name" type="text" className="form-control" onChange={(e) => this.setState({ name: e.target.value })} value={name} />
                        <p className={'error-message ' + (showNameErrMsg ? '' : 'hidden')}>Nafn má ekki vera tómt.</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-username">Notandanafn</label>
                        <input type="text" id="register-username" name="register-username" className="form-control" onChange={(e) => this.setState({ username: e.target.value })} value={username} />
                        <p className={'error-message ' + (showUsernameErrMsg ? '' : 'hidden')}>Notandanafn má ekki vera tómt.</p>
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
        );
    }
}

export default Register;