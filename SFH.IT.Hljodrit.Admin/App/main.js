import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/app';
import About from './components/about';
import NotFound from './components/notFound';

class Main extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <Route path="about" component={About} />
                    <Route path="*" component={NotFound} />
                </Route>
            </Router>
        );
    }
}

render(<Main />, document.getElementById('App'));