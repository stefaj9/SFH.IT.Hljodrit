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
                    logoutUser={this.props.logoutUser} />
                <div className="container site">
                    <div className="row">
                        <div className="col-xs-12">
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
        isLoggedIn: state.auth.isLoggedIn
    };
};

export default connect(mapStateToProps, { logoutUser })(App);