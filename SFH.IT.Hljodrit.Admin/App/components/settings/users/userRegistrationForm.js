import React from 'react';
import PropTypes from 'prop-types';

class UserRegistrationForm extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            showNameErrorMsg: false,
            showEmailErrorMsg: false,
            showPasswordErrorMsg: false,
            showConfirmPasswordErrorMsg: false
        };
    }
    validateForm() {
        const { name, email, password, confirmPassword } = this.state;
        let isValid = true;

        if (name.length === 0) { this.setState({ showNameErrorMsg: true }); isValid = false; }
        if (!email.match(/\w+@\w+\.\w+/g)) { this.setState({ showEmailErrorMsg: true }); isValid = false; }
        if (password.length < 8) { this.setState({ showPasswordErrorMsg: true }); isValid = false; }
        if (confirmPassword !== password) { this.setState({ showConfirmPasswordErrorMsg: true }); isValid = false; }

        return isValid;
    }
    resetForm() {
        this.setState({ showNameErrorMsg: false, showEmailErrorMsg: false, showPasswordErrorMsg: false, showConfirmPasswordErrorMsg: false });
    }
    changeFormInformation(prop, value) {
        this.resetForm();
        this.setState({ [prop]: value }, () => {
            if (this.validateForm()) {
                const { name, email, password, confirmPassword } = this.state;
                this.props.update({ name: name, email: email, password: password, confirmPassword: confirmPassword });
            }
        });
    }
    render() {
        const { showNameErrorMsg, showEmailErrorMsg, showPasswordErrorMsg, showConfirmPasswordErrorMsg, name, email, password, confirmPassword } = this.state;
        return (
            <form action="" className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="user-registration-name">Nafn</label>
                    <input autoFocus={true} type="text" value={name} className="form-control" onChange={(e) => this.changeFormInformation('name', e.target.value)} />
                    <p className={showNameErrorMsg ? 'error-message' : 'hidden'}>Nafn má ekki vera tómt.</p>
                </div>
                <div className="form-group">
                    <label htmlFor="user-registration-email">Netfang</label>
                    <input type="text" className="form-control" value={email} onChange={(e) => this.changeFormInformation('email', e.target.value)} />
                        <p className={showEmailErrorMsg ? 'error-message' : 'hidden'}>Netfang er ekki á réttu formi.</p>
                </div>
                <div className="form-group">
                    <label htmlFor="user-registration-password">Lykilorð</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => this.changeFormInformation('password', e.target.value)} />
                        <p className={showPasswordErrorMsg ? 'error-message' : 'hidden'}>Lykilorð þarf að vera að lágmarki 8 stafir.</p>
                </div>
                <div className="form-group">
                    <label htmlFor="user-registration-password-repeat">Lykilorð endurtekið</label>
                    <input type="password" className="form-control" value={confirmPassword} onChange={(e) => this.changeFormInformation('confirmPassword', e.target.value)} />
                        <p className={showConfirmPasswordErrorMsg ? 'error-message' : 'hidden'}>Lykilorð verður að vera eins.</p>
                </div>
            </form>
        );
    }
};

UserRegistrationForm.propTypes = {
    update: PropTypes.func.isRequired
};

export default UserRegistrationForm;