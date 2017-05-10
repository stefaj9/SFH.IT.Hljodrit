import React from 'react';

export default class UserRegistrationForm extends React.Component {
    render() {
        return (
            <form action="" className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="user-registration-name">Nafn</label>
                    <input autoFocus={true} type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="user-registration-email">Netfang</label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="user-registration-password">Lykilorð</label>
                    <input type="password" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="user-registration-password-repeat">Lykilorð endurtekið</label>
                    <input type="password" className="form-control" />
                </div>
            </form>
        );
    }
};