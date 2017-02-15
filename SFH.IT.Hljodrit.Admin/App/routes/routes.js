import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import About from './components/about';
import Settings from './components/settings';
import NotFound from './components/notFound';

export default (
    <Route path="/" component={App}>
        <Route path="about" component={About} />
        <Route path="settings" component={Settings} />
        <Route path="*" component={NotFound} />
    </Route>
);