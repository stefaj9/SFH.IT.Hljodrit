import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { logoutUser } from '../../actions/authActions';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header 
                    isLoggedIn={this.props.isLoggedIn}
                    userName={this.props.userName} 
                    logoutUser={this.props.logoutUser} />
                <div className="container">
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
        userName: state.auth.userName,
        isLoggedIn: state.auth.isLoggedIn
    };
};

export default connect(mapStateToProps, { logoutUser })(App);