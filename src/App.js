import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FilmsPage from './FilmsPage';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={FilmsPage} />
                <Route path="/films" component={FilmsPage} />
            </Switch>
        </Router>
    );
};

export default App;