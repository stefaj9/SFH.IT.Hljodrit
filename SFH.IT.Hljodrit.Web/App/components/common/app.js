import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { getZipCodes, getCountries } from '../../actions/commonActions';
import { getProjectStatus } from '../../actions/projectActions';
import { logoutUser } from '../../actions/authActions';
import { toastr } from 'react-redux-toastr';

class App extends React.Component {
    componentWillMount() {
        this.props.getZipCodes();
        this.props.getCountries();
        this.props.getProjectStatus();
    }
    componentWillReceiveProps(newProps) {
        let queryParams = newProps.location.query;
        console.log(queryParams);
        if (queryParams.hasOwnProperty('confirm')) {
            toastr.success('Tókst!', queryParams.confirm);
        } else {
            if (queryParams.hasOwnProperty('error')) {
                toastr.error('Villa!', queryParams.error);
            }
        }
    }
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

export default connect(mapStateToProps, { getZipCodes, getCountries, getProjectStatus, logoutUser })(App);