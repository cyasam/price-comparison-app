import React, { useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import UnderConstruction from './components/UnderConstruction';
import Home from './pages/home/Home';

import './App.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <UnderConstruction />
        </Route>
        <Route path="/under-construction">
          <UnderConstruction />
        </Route>
        <Redirect to="/under-construction" />
      </Switch>
    </Router>
  );
};

export default App;
