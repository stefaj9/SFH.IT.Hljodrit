import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import Header from './header';
import '../handlers/songLengthHandler';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header
                    isLoggedIn={this.props.isLoggedIn}
                    logoutUser={this.props.logoutUser}
                    userName={this.props.userName} />
                <div className="container site">
                    <div className="row">
                        <div className="col-xs-10 col-xs-push-1">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        userName: state.auth.userName
    };
};

export default connect(mapStateToProps, { logoutUser })(App);