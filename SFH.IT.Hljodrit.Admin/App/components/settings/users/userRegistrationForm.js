import React from 'react';
import PropTypes from 'prop-types';

class UserRegistrationForm extends React.Component {
    render() {
        return (
            <form action="" className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="user-registration-name">Nafn</label>
                    <input autoFocus={true} type="text" className="form-control" onChange={(e) => this.props.update('name', e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="user-registration-email">Netfang</label>
                    <input type="text" className="form-control" onChange={(e) => this.props.update('email', e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="user-registration-password">Lykilorð</label>
                    <input type="password" className="form-control" onChange={(e) => this.props.update('password', e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="user-registration-password-repeat">Lykilorð endurtekið</label>
                    <input type="password" className="form-control" onChange={(e) => this.props.update('confirmPassword', e.target.value)} />
                </div>
            </form>
        );
    }
};

UserRegistrationForm.propTypes = {
    update: PropTypes.func.isRequired
};

export default UserRegistrationForm;