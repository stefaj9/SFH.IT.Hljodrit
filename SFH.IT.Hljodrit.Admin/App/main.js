import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import applyRouterMiddleware from 'react-router-apply-middleware';
import { useRelativeLinks } from 'react-router-relative-links';
import store from './store';
import Routes from './routes/routes';

const history = syncHistoryWithStore(browserHistory, store);

class Main extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router history={history} routes={routes} render={applyRouterMiddleware(useRelativeLinks())}></Router>
                </div>
            </Provider>
        );
    }
}

render(<Main />, document.getElementById('App'));