import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import UnderConstruction from './components/UnderConstruction';

import './App.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="*">
          <UnderConstruction />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
