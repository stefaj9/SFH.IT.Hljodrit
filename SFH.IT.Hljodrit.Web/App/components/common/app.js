import React from 'react';
import Header from './header';

export default class App extends React.Component {
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
