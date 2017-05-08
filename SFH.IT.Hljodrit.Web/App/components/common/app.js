import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { logoutUser } from '../../actions/authActions';
import Spinner from 'react-spinner';

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
                        <div className={'col-xs-10 col-xs-push-1' + (this.props.isLoggingIn ? ' hidden' : '')}>
                            {this.props.children}
                        </div>
                        <div className={'text-center' + (this.props.isLoggingIn ? '' : ' hidden')}>
                            <Spinner />
                            <p>Athuga auðkenni..</p>
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
        isLoggedIn: state.auth.isLoggedIn,
        isLoggingIn: state.auth.isLoggingIn
    };
};

export default connect(mapStateToProps, { logoutUser })(App);