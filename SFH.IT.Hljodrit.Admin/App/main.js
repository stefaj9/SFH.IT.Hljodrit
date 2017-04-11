import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import applyRouterMiddleware from 'react-router-apply-middleware';
import { useRelativeLinks } from 'react-router-relative-links';
import store from './store';
import Routes from './routes/routes';
import ReduxToastr from 'react-redux-toastr';
import 'rc-time-picker/assets/index.css';
import '../Content/react-bootstrap-table-all.min.css';
import 'react-date-picker/index.css'

const history = syncHistoryWithStore(browserHistory, store);

class Main extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router history={history} routes={Routes} render={applyRouterMiddleware(useRelativeLinks())}></Router>
                    <ReduxToastr 
                        timeOut={4000}
                        newestOnTop={true}
                        preventDuplicates={false}
                        position="top-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                    />
                </div>
            </Provider>
        );
    }
}

render(<Main />, document.getElementById('App'));