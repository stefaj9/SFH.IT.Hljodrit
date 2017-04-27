import React from 'react';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            username: '',
            password: '',
            passwordRepeat: ''
        };
    }
    registerUser(e) {
        console.log(e);
    }
    render() {
        return (
            <div>
                <h2>Nýskráning</h2>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="register-name">Nafn</label>
                        <input id="register-name" name="register-name" type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-username">Notandanafn</label>
                        <input type="text" id="register-username" name="register-username" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-password">Lykilorð</label>
                        <input type="password" id="register-password" name="register-password" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-password-repeat">Lykilorð endurtekið</label>
                        <input type="password" id="register-password-repeat" name="register-password-repeat" className="form-control"/>
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