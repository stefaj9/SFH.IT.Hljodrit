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
                <Header />
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

export default connect(null, { getZipCodes, getCountries, getProjectStatus })(App);