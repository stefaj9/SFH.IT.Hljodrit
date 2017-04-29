import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { getZipCodes, getCountries } from '../../actions/commonActions';
import { getProjectStatus } from '../../actions/projectActions';

class App extends React.Component {
    componentWillMount() {
        this.props.getZipCodes();
        this.props.getCountries();
        this.props.getProjectStatus();
    }
    render() {
        return (
            <div>
                <Header userName={this.props.userName} />
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
        userName: state.auth.userName
    };
};

export default connect(mapStateToProps, { getZipCodes, getCountries, getProjectStatus })(App);