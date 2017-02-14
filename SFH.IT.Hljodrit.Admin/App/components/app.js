import React from 'react';
import Header from './header';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <h4>Zup</h4>
                {this.props.children}
            </div>
        );
    }
}